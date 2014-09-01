(function(){
	var app = angular.module('portfolio',['ng.picturefill','ngSanitize']);
	
	app.controller('PortfolioController', ['$http', function($http){
		var portfolio = this;
    portfolio.work = [];
    $http.get('json/work.json').success(function(data){
      portfolio.work = data;
    });
	}]);
	
	app.directive('portfolioNav', function(){
		return {
			restrict: 'E', 
			templateUrl: 'templates/portfolio-nav.html'
		};
	});
	
	app.directive('portfolioMasthead', function(){
		return {
			restrict: 'E', 
			templateUrl: 'templates/portfolio-masthead.html'
		};
	});
	
	app.directive('portfolioResume', function(){
		return {
			restrict: 'E', 
			templateUrl: 'templates/portfolio-resume.html'
		};
	});
	
	app.directive('portfolioWork', function(){
		return {
			restrict: 'E', 
			templateUrl: 'templates/portfolio-work.html',
			controller: function(){
				this.selectedWork = -1;
				this.detailsOpen = false;
				this.selectWork = function(workNum){
					this.selectedWork = workNum;
					this.detailsOpen = true;
				};
				this.isSelected = function(checkNum){
					return this.selectedWork === checkNum;
				};
			},
			controllerAs: 'select'
		};
	});
})();