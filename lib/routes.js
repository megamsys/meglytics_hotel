var util = require("util");
var CEPH = require("../request/ceph.js");
var MEGAM = require("../request/megam.js");
var express = require('express');

module.exports = function(app) {

	app.get("/", function(req, res) {
		req.next();
	});

	app.get("/deploy/:name", function(req, res) {
		
		ii = { source: "https://github.com/megamsys/io.megam.sparkbb.WordCountExample", 
			         assembly_id:"ASM87645846987", 
			         inputs:
						[{"key":"ceph_access_key", "value" : "b@a.co"},
     					{"key":"ceph_secret_key", "value": "Oek7nkZcjiwJdTmsSPAT7g=="},
    					{"key":"bucket", "value": "testsparkbb"},
    					{"key":"file1", "value": "hotel.csv"},
    					{"key":"string", "value": "testing value hello world"},
    					{"key":"ceph_endpoint", "value": "http://192.168.1.105"}]
    					}
    	MEGAM.setEmail("test@megam.io");
    	MEGAM.setApiKey("faketest");
    	jj = JSON.stringify(ii)
		MEGAM.post(jj).then(function() {
			console.log("-------------------------");
		}).otherwise(function(err) {
			util.log("> Error : " + err);
			res.status(500).redirect("/");
		});
	});

	app.get("/buckets", function(req, res) {
		var objs = [];
		var args = {
			accessKey : process.env.CEPH_ACCESS_KEY,
			secretKey : process.env.CEPH_SECRET_KEY,
			endpoint : "http://192.168.1.102"
		}
		CEPH.createClient(args).then(function() {
			var cli = CEPH.getClient();

			CEPH.requestBuckets(cli).then(function() {
				var buckets = CEPH.getBuckets();
				res.json(buckets.Buckets);
			}).otherwise(function(err) {
				util.log("> Error : " + err);
				res.status(500).redirect("/");
			});

		}).otherwise(function(err) {
			util.log("> Error : " + err);
			res.status(500).redirect("/");
		});

	});

	app.get("/objects/:name", function(req, res) {
		var objs = [];
		var args = {
			accessKey : process.env.CEPH_ACCESS_KEY,
			secretKey : process.env.CEPH_SECRET_KEY,
			endpoint : "http://192.168.1.102"
		}
		CEPH.createClient(args).then(function() {
			var cli = CEPH.getClient();
			params = {
				Bucket : req.params.name
			}
			CEPH.requestObjects(params, cli).then(function() {
				var objects = CEPH.getObjects();
				res.json(objects);
			}).otherwise(function(err) {
				util.log("> Error : " + err);
				res.status(500).redirect("/");
			});

		}).otherwise(function(err) {
			util.log("> Error : " + err);
			res.status(500).redirect("/");
		});
	});

	app.use("/", express.static(__dirname + '/../public'));

};

