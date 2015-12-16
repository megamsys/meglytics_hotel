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

// We need this to build our post string
var http = require('http');
var request = require('request');
var fs = require('fs');
var when = require('when');
var crypto = require('crypto');
var time = require('time');


var now = new time.Date();
var version = "/v2";
var result = {};
var post_result = {};
//var host = 'https://api.megam.io';
var host = 'http://localhost:9000';
var email = "";
var api_key = "";

var MEGAM = module.exports = {

   setEmail : function(req_email) {
			email = req_email;
    },	
		
    setApiKey : function(req_apikey) {
		api_key = req_apikey;
    },	  	
		
	getData : function() {
		return result;
	},
	
	getPostData : function() {
		return post_result;
	},	
		
	post : function(flows) {	
		var defer = when.defer();
		var path = version + "/sparkjobs/content";
		console.log("==========================");
		console.log(flows);
		console.log(path);
		console.log(api_key);
		var hmac = generateHMAC(flows, path, api_key);
		// An object of options to indicate where to post to
		// Configure the request
		var options = {
			url : host + path,
			method : 'POST',
			headers : {
				'X-Megam-DATE' : now.toString(),
				'X-Megam-EMAIL' : email,
				'X-Megam-APIKEY' : api_key,
				'X-Megam-HMAC' : email +":"+ hmac,
				'Accept' : 'application/vnd.megam+json',
				'Content-Type' : 'application/json'
			},
			form : flows
		};
		// Start the request
		 request(options, function(error, response, body) {			
				post_result = body;			
				defer.resolve(); 			
		});
		return defer.promise;
	}

};

function createSign(data, path) {
	var mkSign = now.toString() + "\n" + path + "\n" + calculateMD5(data);
	console.log(mkSign);
	return mkSign;
}

function calculateMD5(data) {
	md5 = crypto.createHash("md5", "MD5").update(data).digest(encoding = 'base64');
	console.log(md5);
	return md5;
}

function generateHMAC(flows, path, apikey) {
	var algorithm = 'sha1';
	var hash, hmac;
	hmac = crypto.createHmac(algorithm, apikey).update(createSign(flows, path)).digest("hex");
	console.log(hmac);
	return hmac;
}