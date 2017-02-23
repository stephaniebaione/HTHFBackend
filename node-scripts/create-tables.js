console.log("Creating Tables\n");

// dependencies
var pg = require('pg');
var fs = require('file-system');

// create a config to configure both pooling behavior
// and client options
// note: the environment variables
// will be read if the config is not present

var port = process.env.ENV_VARIABLE || 5432;
var max = 10;
var idleTimeoutMillis = 30000;
var configFile = fs.readFileSync('./database-connection-info.json', 'utf8');
var config = JSON.parse(configFile);

// add additional fields for configuring pools
config['port'] = port;
config['max'] = max;
config['idleTimeoutMillis'] = idleTimeoutMillis;

var client = new pg.Client(config);

// console.log(client);

// connect to our database
client.connect(function (err) {
    if (err) throw err;
    createUsersTable();
});

function createUsersTable() {
    // assumes that the client is already connected
    // TODO: Create USERS table with correct structure
    client.query("CREATE TABLE DUMMYUSERSTABLE(DUMMY INT NOT NULL, PRIMARY KEY(DUMMY))", function (err, result) {

        if (err) {
            // print error to the console if there was an error
            console.log("ERROR CREATING TABLE \'USERS\'");
            console.log(err.message);
        }

        // disconnect the client
        client.end(function (err) {
            if (err) throw err;
        });
    });
}