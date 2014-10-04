var app = angular.module('app', []);

app.controller('MainController', function($scope) {
	$scope.links = [];
	console.log("test");
	$.ajax({
		url: "http://localhost:1337/links/",
		success: function(data) {
			$scope.$apply(function() {
				$scope.links = data;
			});
		}
	});
});

$(function() {
	console.log("Let's go...");
});