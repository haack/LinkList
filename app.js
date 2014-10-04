var app = angular.module('app', []);

app.controller('MainController', function($scope) {
	$scope.message = "hello there";
	$scope.model = [];

	$.ajax({
		url: "http://localhost:1337/links/",
		success: function(data) {
			$scope.$apply(function() {
				$scope.model = data;
			});
		}
	});
});

$(function() {
	console.log("Let's go...");
});