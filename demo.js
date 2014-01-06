var module = angular.module( 'demo', [ 'ngYouTubeAPI' ] );

/******************** DEMO SPECIFIC **********************/

module.service( 'VideoService', function() {
	var Videos = {};

	Videos.group1 = [{
		'vid': 'uEdRLlqdgA4'
	 },{
		'vid': 'W6DmHGYy_xk'
	 },{
		'vid': 'bwJ5bRY16OE'
	 },{
		'vid': 'iYsAEAel9uk'
	 },{
		'vid': 'Zub1-8l0bnU'
	 }];

	Videos.group2 = [{
		'vid': 'uEdRLlqdgA4'
	},{
		'vid': 'W6DmHGYy_xk'
	},{
		'vid': 'bwJ5bRY16OE'
	},{
		'vid': 'iYsAEAel9uk'
	},{
		'vid': 'Zub1-8l0bnU'
	}];

	return Videos;

});

module.controller( 'VideoController', [ '$scope', 'VideoService', function( $scope, VideoService ) {

	$scope.videos = VideoService;

}]);




module.directive( 'ytPlay', [ 'constructor', function( constructor ) {
	return {
		scope: {
			player: '@ytPlay'
		},
		link: function( scope, element, attrs) {
			angular.element( element ).bind( 'click', function() {
				constructor.players[scope.player].playVideo();
			});
		}
	}
}]);


/*********************************************************/