(function(){
	var app = angular.module('portfolio',['ng.picturefill','ngSanitize','matchmedia-ng']);
	
	app.controller('PortfolioController', ['$http', 'matchmedia', function($http, matchmedia){
    //Get the portfolio data
		var portfolio = this;
    portfolio.work = [];
    $http.get('json/work.json').success(function(data){
      portfolio.work = data;
    });
    //Add more media properties here when needed
		portfolio.phone = matchmedia.isPhone();
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
			templateUrl: 'templates/portfolio-resume.html',
			controller: function() {
				this.show = false;
				this.showText = 'Show';
				this.showDetails = function() {
					this.show = !this.show;
					this.showText = this.show ? 'Hide' : 'Show';
				}
			},
			controllerAs: 'resumeDetails'
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