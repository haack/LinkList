var app = angular.module('app', []);

app.controller('MainController', function($scope) {
	$scope.message = "hello there";
});

$(function() {
	console.log("Let's go...");
});