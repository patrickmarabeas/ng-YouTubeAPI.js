# ng-YouTubeAPI.js

### Implementing the YouTube API with AngularJS.

This implementation comes with three directives for different functionality. This implementation is also specifically designed to handle multiple players on one page - there's nothing stopping you from simply using one however.

#### The ytPlayer Directive

	<div data-yt-player="myPlayer" data-yt-vid="MyYouTubeVideoID"></div>

This baby is the actual video player. Give it an ID and the video you want it to load with. You can have as many of these on the page as you wish, just be sure to give each a unique ID.

Crack ng-YouTubeAPI.js open and alter the template as you require.

#### The ytPlayto Directive

	<div data-yt-playto="myPlayer" data-yt-vid="anotherVideoID"></div>

This directive allows you to load another video into the stipulated player. Alter the template as needed.

#### The ytSpy Directive

	<div data-yt-spy="myPlayer" data-yt-value="title"></div>

This directive allows you to spy on the player in question and retrieve data about it, outside of any template scope. Want your player and 'what's playing now' data in completely different areas? Use this instead, or as well as, the template found in the ytPlayer directive.