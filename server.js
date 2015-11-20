/*
 ** Copyright [2013] [Megam Systems]
 **
 ** Licensed under the Apache License, Version 2.0 (the "License");
 ** you may not use this file except in compliance with the License.
 ** You may obtain a copy of the License at
 **
 ** http://www.apache.org/licenses/LICENSE-2.0
 **
 ** Unless required by applicable law or agreed to in writing, software
 ** distributed under the License is distributed on an "AS IS" BASIS,
 ** WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ** See the License for the specific language governing permissions and
 ** limitations under the License.
 */

var fs = require('fs'), net = require('net'), util = require('util'), url = require('url'), http = require('http'), path = require('path'), mime = require('mime');

var yaml = require('./lib/happ_config.js');

// Make sure to include the JSX transpiler
require('node-jsx').install();

/**
 * Create a server to listen on port 7000. TO-DO: Make port configurable in a js
 * or json file.
 */
var express = require('express');
var app = express();
var server = http.createServer(app)

server.listen(yaml.config.server.port);
console.log("Hotel app Server:" + yaml.version + " listening on port =" + yaml.config.server.port);

app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/app/components'));
app.use(express.static(__dirname + '/app'));

// Set up Routes for the application
require('./app/routes/core-routes.js')(app);

// Set view path
app.set('views', path.join(__dirname, 'views'));
// set up ejs for templating. You can use whatever
app.set('view engine', 'ejs');


