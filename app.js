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
});

addLink = function() {
	$.ajax({
		type: "POST",
		url: "http://localhost:1337/link/",
		data: '{ "url": "'+$("#linkUrl").val()+'"}',
		contentType: "application/json"
	});
}


$(function() {
	console.log("Let's go...");
});