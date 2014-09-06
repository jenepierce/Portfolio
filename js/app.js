(function(){
	var app = angular.module('site',['ng.picturefill','ngSanitize','matchmedia-ng']);
	
	app.controller('SiteController', ['matchmedia', function(matchmedia){
		var site = this;
		//Add more media properties here when needed
		site.phone = matchmedia.isPhone();
	}]);
	
	app.directive('siteNav', function(){
		return {
			restrict: 'E', 
			templateUrl: 'templates/site-nav.html'
		};
	});
	
	app.directive('siteMasthead', function(){
		return {
			restrict: 'E', 
			templateUrl: 'templates/site-masthead.html'
		};
	});
	
	app.directive('siteResume', function(){
		return {
			restrict: 'E', 
			templateUrl: 'templates/site-resume.html',
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
	
	app.directive('sitePortfolio', function(){
		return {
			restrict: 'E', 
			templateUrl: 'templates/site-portfolio.html',
			controller: ['$http', function($http){
				var portfolio = this;

				// Get portfolio work
				portfolio.work = [];
		    $http.get('json/work.json').success(function(data){
		      portfolio.work = data;
		    });
		    
				// Set selected work
				this.detailsOpen = false;
				this.selectedWork = [];
				this.workNum = -1;
				this.selectWork = function(workNum){
					this.selectedWork = portfolio.work[workNum];
					this.workNum = workNum;
					this.detailsOpen = true;
				};
				
				// Check if work is selected
				this.isSelected = function(checkNum){
					return this.workNum === checkNum;
				};

			}],
			controllerAs: 'portfolio'
		};
	});
})();