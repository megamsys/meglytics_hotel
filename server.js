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

var fs = require('fs'); 
var net = require('net'); 
var util = require('util'); 
var url = require('url'); 
var http = require('http');
var path = require('path'); 
var mime = require('mime');

var yaml = require('./lib/config.js');

// Make sure to include the JSX transpiler
require('node-jsx').install();

/**
 * Create a server to listen on port 7000. TO-DO: Make port configurable in a js
 * or json file.
 */
var express = require('express');
var app = express();
var server = http.createServer(app)

var port = yaml.config.server.port || 2015

server.listen(port);
util.log("> App server : " + yaml.version + " listening on port =" + port);

util.log("> Server started...");
// Set up Routes for the application
require('./lib/routes.js')(app);

// Set view path
app.use("/",express.static(__dirname + '/../public'));
// set up ejs for templating. You can use whatever
//app.set('view engine', 'ejs');




