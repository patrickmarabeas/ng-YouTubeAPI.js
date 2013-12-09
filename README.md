# ng-YouTubeAPI.js

### Implementing the YouTube API with AngularJS.

This implementation comes with three directives for different functionality. This implementation is also specifically designed to handle multiple players on one page - there's nothing stopping you from simply using one however.

#### The ytPlayer Directive

	<div data-yt-player="myPlayer" data-yt-vid="MyYouTubeVideoID" data-yt-playervars="{'modestbranding': 1}"></div>

This baby is the actual video player. Give it an ID and the video you want it to load with. You can have as many of these on the page as you wish, just be sure to give each a unique ID.

Crack ng-YouTubeAPI.js open and alter the template as you require.

You can see the full list of player vars here: https://developers.google.com/youtube/player_parameters?playerVersion=HTML5#Parameters

#### The ytPlayto Directive

	<div data-yt-playto="myPlayer" data-yt-vid="anotherVideoID"></div>

This directive allows you to load another video into the stipulated player. Alter the template as needed. Feel free to strip out the $http call if you want to define the video name yourself.

But the API has `loadVideoById()`??? If you don't need to return any video data, feel free to use it.

#### The ytSpy Directive

	<div data-yt-spy="myPlayer" data-yt-value="title"></div>

This directive allows you to spy on the player in question and retrieve data about it, outside of any template scope. Want your player and 'what's playing now' data in completely different areas? Use this instead, or as well as, the template found in the ytPlayer directive.

#### API Functions

All the YouTube API functions can be called by passing in the constructor service to your custom directives / controllers:

	constructor.players['myPlayer'].playVideo();

They can all be found here: https://developers.google.com/youtube/iframe_api_reference#Playback_controls