var app = angular.module('app', ['ngAnimate']);

app.controller('MainController', function($scope) {
	$scope.links = [];

	$.ajax({
		url: "http://localhost:1337/links/",
		success: function(data) {
			$scope.$apply(function() {
				$scope.links = data;
			});
		}
	});

	$scope.addLink = function() {
		//plugin is a bit messed up. no easy access
		var items = $('#tags_tagsinput span span').text().split(" ");
		var tags = [];
		for (var i = 0; i < items.length-1; i+=2) {
			tags.push(items[i]); 
		}


		var str = $("#linkUrl").val();

		//strip away http and www
		if (str.substring(0, 7) == "http://") {
			str = str.slice(7);
		}

		if (str.substring(0, 8) == "https://") {
			str = str.slice(8);
		}

		if (str.substring(0, 4) == "www.") {
			str = str.slice(4);
		}

		var arr = str.split('/'),
	    address = arr.splice(0,1);
		var path = arr.join('/');
		$.ajax({
			type: "POST",
			url: "http://localhost:1337/link/",
			data: '{ "url": "'+address+'", "path": "'+path+'", "tags": '+ JSON.stringify(tags) +'}',
			contentType: "application/json",
			success: function(link) {
				$scope.$apply(function() {
					//TODO check if succeded
					$scope.links.push(link);
					$('#linkUrl').val("");
				});
			}
		});
	}

	$scope.hitLink = function(id) {
		// if ($.cookie(id) != "true") {
			$.ajax({
				url: "http://localhost:1337/link/hit/"+id,
				success: function(link) {
					$scope.$apply(function() {
						// $.cookie(id, true);

						for (var i = 0; i < $scope.links.length; i++) {
							if ($scope.links[i]._id === id) {
								$scope.links[i] = link;
							}
						}
					});
				}
			});
		// }
	}
});

powerup = function(hits, newHits) {
	//get _id
	var found = false;
	var i = 0;
	var $scope = angular.element($('body')).scope();
	while (!found) {
		if ($scope.links[i].hits === hits) {
			$scope.$apply(function() {
				$scope.links[i].hits = newHits;
			});	
			found = true;
		}
		i++;
	}
}

$('#tags').tagsInput();

$(function() {
	console.log("Let's go...");
});