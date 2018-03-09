var app = angular.module('weather', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider
	.when('/', {
		templateUrl: 'pages/home.html',
		controller: 'mainCtrl'
	})
	.when('/forecast', {
		templateUrl: 'pages/forecast.html',
		controller: 'forecastCtrl'
	});

	$locationProvider.hashPrefix('');

}]);

app.factory('cityService', [function () {
	
	var city = {};
	city.name = '';
	return city;

}]);

app.controller('mainCtrl', ['$scope', 'cityService','$http',  function($scope, cityService, $http){

	$scope.city = cityService.name;

	$scope.$watch('city', function(){
		cityService.name = $scope.city;
	});
	$scope.forecast;


	$scope.displayWeather = function(event){
		event.preventDefault();

		$http.get('http://api.worldweatheronline.com/premium/v1/weather.ashx?key=f8969477578b41719df131902182602&q='+$scope.city+'&num_of_days=3&tp=3&format=json')

		.then(function(data){
			
			$scope.forecast = data.data.data.weather;

			}, function(data){

				console.log( 'Greska ' + data);

		});

	};

}]);

app.controller('forecastCtrl', ['$scope', 'cityService',  function($scope, cityService){

	$scope.city = cityService.name;


}]);