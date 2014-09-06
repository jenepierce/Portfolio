(function(){
	var app = angular.module('site',['ng.picturefill','ngSanitize','matchmedia-ng']);
	
	app.controller('SiteController', ['$http', 'matchmedia', function($http, matchmedia){
    //Get the site data
		var site = this;
    site.work = [];
    $http.get('json/work.json').success(function(data){
      site.work = data;
    });
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