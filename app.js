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
		console.log(id);
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

$('#tags').tagsInput();

$(function() {
	console.log("Let's go...");
});