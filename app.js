var app = angular.module('app', []);

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
		$.ajax({
			type: "POST",
			url: "http://localhost:1337/link/",
			data: '{ "url": "'+$("#linkUrl").val()+'"}',
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
		$.ajax({
			url: "http://localhost:1337/link/hit/"+id,
			success: function(link) {
				$scope.$apply(function() {
					console.log("asd");
					for (var i = 0; i < $scope.links.length; i++) {
						if ($scope.links[i]._id === id) {
							$scope.links[i] = link;
						}
					}
				});
			}
		});
	}
});






$(function() {
	console.log("Let's go...");
});