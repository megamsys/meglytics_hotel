/*
 ** Copyright [2012-2013] [Megam Systems]
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

var when = require('when');
var util = require("util");
var AWS = require('aws-sdk');

var buckets = {};
var objects = {};
var client = null;

var error = "";

// @object ClientArgs Paramters passed from outside functions.
// @string accessKeyId Pipes in the access key for ceph access
// @string secretAccessKey Pipes in the secret key for ceph access
// @string endpoint Pipes in an endpoint for 3rd party ceph services
// @return client object for ceph NPM package
function s3Client(ClientArgs) {
	var defer = when.defer();
	var ep = new AWS.Endpoint(ClientArgs.endpoint);
    var creds = new AWS.Credentials({
  						accessKeyId: ClientArgs.accessKey, 
  						secretAccessKey: ClientArgs.secretKey, 
					});
    client = new AWS.S3({
       			endpoint: ep,
       			credentials: creds,
       			s3BucketEndpoint: false,
       			s3ForcePathStyle: true,
       		});   
 	if (client != null) {
 	   defer.resolve();  	
 	} else {
 		error = "could not connection to CEPH"	
 	}	
 	
	return defer.promise;
}

// @description List all buckets for a client
// @return JSON object if passed. console error message.
function listbuckets(client) {
	var defer = when.defer();
	client.listBuckets(function(err, data) {		
  		if (err) {
  			error = 'Could not retrieve buckets. Error: ' + err; // an error occurred
  			util.log("> Error : " + error);
  			defer.resolve(); 
  		} else {
  			 buckets = data;           // successful response
  			 defer.resolve(); 
  		}    
	});	
	return defer.promise;
 }
 
// @description List all objects for a bucket
// @return JSON object if passed. console error message.
function listobjects(params, client) {
	var defer = when.defer();

	client.listObjects(params, function(err, data) {	
  		if (err) {
  			error = 'Could not retrieve buckets. Error: ' + err; // an error occurred
  			util.log("> Error : " + error);
  			defer.resolve(); 
  		} else {
  			 objects = data;           // successful response
  			 defer.resolve(); 
  		}    
	});	
	return defer.promise;
 }
 
function parseObjects(args) {
	var result = [];
	for(var i = 0; i < args.Contents.length; i++){ 
		result.push(args.Contents[i].Key);						
	}
	return result;	
} 

var CEPH = module.exports = {
	createClient : function(args) {
		var defer = when.defer();
		s3Client(args).then(function() {
			defer.resolve();
		}).otherwise(function(err) {
			util.log("> Error : " + err);
			defer.resolve();
		});
		return defer.promise;
	},	
	getClient : function() {
		return client;
	},
	requestBuckets : function(client) {
		var defer = when.defer();
		listbuckets(client).then(function() {
			defer.resolve();
		}).otherwise(function(err) {
			util.log("> Error : " + err);
			defer.resolve();
		});
		return defer.promise;
	},
	getBuckets : function() {
		return buckets;
	},
	requestObjects : function(params, client) {
		var defer = when.defer();
		listobjects(params, client).then(function() {
			defer.resolve();
		}).otherwise(function(err) {
			util.log("> Error : " + err);
			defer.resolve();
		});
		return defer.promise;
	},
	getObjects : function() {
		return parseObjects(objects);
	},
}



