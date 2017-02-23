console.log("Running drop-tables.js\n");

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

    dropTable('DUMMYUSERSTABLE');

    // client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = \'public\' ORDER BY table_name;", function (err, result) {
    //
    //     if (err) {
    //         // print error to the console if there was an error
    //         console.log("Error fetching data");
    //         console.log(err.message);
    //     } else {
    //         console.log(result.rows);
    //         // drop table passed in as parameter
    //         dropTable('DUMMYUSERSTABLE');
    //     }
    //
    //     // disconnect the client
    //     client.end(function (err) {
    //         if (err) throw err;
    //     });
    // });
});

function dropTable(table) {
    // assumes that the client is already connected
    client.query("DROP TABLE " + table, function (err, result) {

        if (err) {
            // print error to the console if there was an error
            console.log("Error dropping table \'" + table + "\'");
            console.log(err.message);
        } else {
            console.log("Dropped table \'" + table + "\'");
        }

        // disconnect the client
        client.end(function (err) {
            if (err) throw err;
        });
    });
}