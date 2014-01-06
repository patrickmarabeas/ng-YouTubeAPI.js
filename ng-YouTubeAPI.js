/* ng-YouTubeAPI.js v1.1.0
 * https://github.com/patrickmarabeas/ng-YouTubeAPI.js
 *
 * Copyright 2013, Patrick Marabeas http://pulse-dev.com
 * Released under the MIT license
 * http://opensource.org/licenses/mit-license.php
 *
 * Date: 03/12/2013
 */

var module = angular.module( 'ngYouTubeAPI', [] );

module.run( [ '$window', '$document', '$rootScope', function( $window, $document, $rootScope ) {
	var tag = $document[0].createElement( 'script' );
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = $document[0].getElementsByTagName( 'script' )[0];
	firstScriptTag.parentNode.insertBefore( tag, firstScriptTag );

//	$window.onYouTubePlayerAPIReady = function() {
//		$rootScope.$broadcast( 'onYouTubePlayerAPIReady' );
//	};

}]);

module.service( 'constructor', [ function() {
	return {
		players: [],
		construct: function( id, vid, vars ) {
			this.players[id] = new YT.Player( id, {
				height: '390',
				width: '640',
				videoId: vid,
//				playerVars: {
//
//				},
				playerVars: vars,
				events: {
					'onReady': function() {
					},
					'onStateChange': function() {
					}
				},
				title: 'sup'
			});
		}
	}
}]);

module.directive( 'ytPlayer', [ 'constructor', function( constructor ) {
	return {
		restrict: 'A',
		scope: {
			player: '@ytPlayer',
			vid: '@ytVid'
		},
		controller: [ '$scope', '$http', function( $scope, $http ) {

			$scope.$watch( 'vid', function() {

				$http( {
					method: 'JSONP',
					url: 'http://gdata.youtube.com/feeds/api/videos/' + $scope.vid + '?v=2&alt=json&callback=JSON_CALLBACK'
				}).success(function( data, status ) {

						/* template usage */
						$scope.title = data.entry.title.$t;
						$scope.description = data.entry.media$group.media$description.$t;
						$scope.author = data.entry.author[0].name.$t;
						$scope.viewCount = data.entry.yt$statistics.viewCount;
						$scope.published = data.entry.published.$t;
						$scope.likes = data.entry.yt$rating.numLikes;
						$scope.dislikes = data.entry.yt$rating.numDislikes;

						/* spy usage */
						constructor.players[$scope.player].title = data.entry.title.$t;
						constructor.players[$scope.player].description = data.entry.media$group.media$description.$t;
						constructor.players[$scope.player].author = data.entry.author[0].name.$t;
						constructor.players[$scope.player].viewCount = data.entry.yt$statistics.viewCount;
						constructor.players[$scope.player].published = data.entry.published.$t;
						constructor.players[$scope.player].likes = data.entry.yt$rating.numLikes;
						constructor.players[$scope.player].dislikes = data.entry.yt$rating.numDislikes;

					}).error( function( data, status ) {

					});

			});

		}],
		template: '<div>' +
			'<div id="{{player}}"></div>' +
			'<div>{{author}}</div>' +
			'<h2>{{title}}</h2>' +
			'<div>{{description}}</div>' +

			'</div>',
		replace: true,
		link: function( scope, element, attrs ) {

//			scope.$on( 'onYouTubePlayerAPIReady', function( events, args ) {
			window.onYouTubePlayerAPIReady = function() {
				var vars = eval("("+attrs.ytPlayervars+")");
				constructor.construct( attrs.ytPlayer, attrs.ytVid, vars );

				console.log(vars);
				console.log(constructor.players['mainPlayer']);
			};
//			});

			scope.$on( attrs.ytPlayer, function( events, args ) {

				constructor.players[events.name].loadVideoById( args.vid );

				scope.$apply( function() {
					scope.vid = args.vid;

				});

			});

		}
	}
}]);

module.directive( 'ytPlayto', [ '$rootScope', function( $rootScope ) {
	return {
		restrict: 'A',
		scope: {
			playto: '@ytPlayto',
			vid: '@ytVid'
		},
		controller: [ '$scope', '$attrs', '$http', function( $scope, $attrs, $http ) {

			$http( {
				method: 'JSONP',
				url: 'http://gdata.youtube.com/feeds/api/videos/' + $scope.vid + '?v=2&alt=json&callback=JSON_CALLBACK'
			}).success(function( data, status ) {

					console.log('success');

					$scope.title = data.entry.title.$t;
					$scope.description = data.entry.media$group.media$description.$t;
					$scope.author = data.entry.author[0].name.$t;
					$scope.viewCount = data.entry.yt$statistics.viewCount;
					$scope.published = data.entry.published.$t;
					$scope.likes = data.entry.yt$rating.numLikes;
					$scope.dislikes = data.entry.yt$rating.numDislikes;

				}).error( function() {

				})

		}],
		template: '<button>{{ title }}, {{ viewCount }}</button>',
		replace: true,
		link: function( scope, element, attrs ) {

			angular.element( element ).bind( "click", function() {

				$rootScope.$broadcast( scope.playto, {
					'vid': scope.vid
				});

			});

		}
	}
}]);

module.directive( 'ytSpy', [ 'constructor', function( constructor ) {
	return {
		scope: {
			spy: '@ytSpy',
			value: '@ytValue'
		},
		template: '<span>{{data}}</span>',
		replace: true,
		link: function( scope, element, attrs ) {

			angular.element( document ).ready( function() {

				scope.player = constructor.players[scope.spy];
				scope.data = scope.player[scope.value];
				scope.$apply();

				scope.$watch( 'player.' + scope.value, function() {
					scope.data = constructor.players[scope.spy][scope.value];
				});

			});

		}
	}
}]);