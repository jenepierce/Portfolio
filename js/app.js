(function(){
	var app = angular.module('portfolio',['ng.picturefill']);
	
	app.controller('PortfolioController', ['$http', function($http){
		var portfolio = this;
    portfolio.work = [];
    $http.get('json/work.json').success(function(data){
      portfolio.work = data;
    });
	}]);
	
	app.directive('portfolioNav', function(){
		return {
			restrict: 'E', // E for element
			templateUrl: 'templates/portfolio-nav.html'
		};
	});
	
	app.directive('portfolioMasthead', function(){
		return {
			restrict: 'E', // E for element
			templateUrl: 'templates/portfolio-masthead.html'
		};
	});
	
	app.directive('portfolioResume', function(){
		return {
			restrict: 'E', // E for element
			templateUrl: 'templates/portfolio-resume.html'
		};
	});
	
	app.directive('portfolioWork', function(){
		return {
			restrict: 'E', // E for element
			templateUrl: 'templates/portfolio-work.html'
		};
	});
})();