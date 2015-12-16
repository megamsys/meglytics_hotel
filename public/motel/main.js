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

var MOTEL = function() {
	
	function deploy(obj) {
		$.ajax({
			url : "/deploy/" + obj,
			dataType : 'json',
			type : 'GET',
			cache : false,
			success : function(data) {
				console.log(data);
			},
			error : function(xhr, status, err) {
				console.error(err.toString());
			}
		});
	}

	function loadBuckets() {
		$.ajax({
			url : "/buckets",
			dataType : 'json',
			type : 'GET',
			cache : false,
			success : function(data) {
				parseBuckets(data);
			},
			error : function(xhr, status, err) {
				console.error(err.toString());
			}
		});
	}

	function loadObjects(bucketname) {
		$.ajax({
			url : "/objects/" + bucketname,
			dataType : 'json',
			type : 'GET',
			cache : false,
			success : function(data) {
				parseObjects(data);
			},
			error : function(xhr, status, err) {
				console.error(err.toString());
			}
		});
	}

	function parseBuckets(params) {
		for (var i = 0; i < params.length; i++) {
			$("#listbuckets").append('<li>' + params[i].Name + '</li>');
		}
		$("#listbuckets li").click(function() {
			loadObjects($(this).text());
		});
	}

	function parseObjects(data) {
		$("#obj_text").hide();
		$("#listobjects").empty();
		for (var i = 0; i < data.length; i++) {
			$("#listobjects").append('<li id="' + data[i] + '">'+
									'<input id="radio_' + data[i] + '" type="radio" name="radio" value="' + data[i] + '" >'+
                                    '<label for="radio_' + data[i] + '">' + data[i] + '</label>'+
                                    '</li>');
		}
		
		$("#listobjects li").click(function() {
			$('#radio_'+this.id).prop('checked', true);
		})
		
	}

	function loadUIActions() {
		//toastr.info('Are you the 6 fingered man?')
		
		$('#deploy_button').prop('disabled', true);
		
		$('#deploy_button').click(function() {
			var obj = $("#listobjects input[type='radio']:checked").val();
			console.log(obj);
			deploy(obj);
		})
		
		$("#analysis").click(function() {
			analysis();
		})
	}

	$(function() {
		loadUIActions();
		loadBuckets();
		
	});

	return {
	};
}();
