app.controller('MainController',['$scope',function($scope)
{
	$scope.Experiments=[
		[
			{
				name:'Fallen Robot++',
				info:'Upgrades to Fallen Robot',
				image:'images/upfallen.png',
				class:'image fit from-left',
				linkDesc:'Play it now!',
				link:'https://dl.dropboxusercontent.com/u/113094663/hr/happyrobot.html'
				//something:"<a href='https://dl.dropboxusercontent.com/u/113094663/webgl/Sprites/index.html>Play it!</a>"
			},
			{
				name:"Construct 2",
				info:"Testing Construct 2",
				image:'images/construct.png',
				class:'image fit from-right',
				linkDesc:'Play it now!',
				link:"https://dl.dropboxusercontent.com/u/113094663/demo/index.html"

			}
		],
		[
			{
				name:'My Minecraft Clone',
				info:'I wanted to learn how Minecraft was made',
				image:'images/mine.png',
				class:'image fit from-left',
				linkDesc:'Play it now!',
				link:'https://dl.dropboxusercontent.com/u/113094663/MineDragon/voxel2.html'
				//something:"<a href='https://dl.dropboxusercontent.com/u/113094663/webgl/Sprites/index.html>Play it!</a>"
			},
			{
				name:"Time Traveling",
				info:"Testing movement and animations",
				image:'images/time.png',
				class:'image fit from-right',
				linkDesc:'Play it now!',
				link:"http://gamejolt.com/games/run-em-over/79746"

			}
		],
		[
			{
				name:'Physics and Gameplay!',
				info:'A physics based game',
				image:'images/apg.png',
				class:'image fit from-left',
				linkDesc:'Play it now!',
				link:'https://dl.dropboxusercontent.com/u/113094663/sp/200215%20150/web.html'
				//something:"<a href='https://dl.dropboxusercontent.com/u/113094663/webgl/Sprites/index.html>Play it!</a>"
			},
			{
				name:"Checking Horror games",
				info:"A Mine Horror enviroment",
				image:'images/horror.png',
				class:'image fit from-right',
				linkDesc:'Play it now!',
				link:"https://dl.dropboxusercontent.com/u/113094663/Web/Web.html"

			}
		],
		[
			{
				name:'Web GL Rendering',
				info:'Web GL 2D Rendering Engine',
				image:'images/webgl.png',
				class:'image fit from-left',
				linkDesc:'Play it now!',
				link:'https://dl.dropboxusercontent.com/u/113094663/webgl/Sprites/index.html'
				//something:"<a href='https://dl.dropboxusercontent.com/u/113094663/webgl/Sprites/index.html>Play it!</a>"
			},
			{
				name:"Gravity Dreams",
				info:"A space game based on gravity",
				image:'images/gravitydreams.png',
				class:'image fit from-right',
				linkDesc:'Watch on Youtube!',
				link:"https://www.youtube.com/watch?v=S7ll08iAqjA"

			}
		],
	];
	$scope.data='gfys';
	$scope.Works=[
		[
			{
				name:'Gamejolt Profile',
				info:'May Games in Gamejolt',
				image:'images/gamejolt.png',
				class:'image fit from-left',
				linkDesc:'Play it',
				link:'http://gamejolt.com/profile/myselfxd/294405/games'
				//something:"<a href='https://dl.dropboxusercontent.com/u/113094663/webgl/Sprites/index.html>Play it!</a>"
			},
			{
				name:"Run'em over",
				info:"Game made in PewDiePie's jam",
				image:'images/runemover.png',
				class:'image fit from-right',
				linkDesc:'Play it now!',
				link:"http://gamejolt.com/games/run-em-over/79746"

			}
		],
		[
			{
				name:'Futbolopolis',
				info:'Mobile soccer game',
				image:'images/futbolopolis.jpg',
				class:'image fit from-left',
				linkDesc:'Download it now!',
				link:'http://futbolopolis.com/'
				//something:"<a href='https://dl.dropboxusercontent.com/u/113094663/webgl/Sprites/index.html>Play it!</a>"
			},
			{
				name:"A Simple Game",
				info:"A multiplayer game cross-platform",
				image:'images/asimplegame.png',
				class:'image fit from-right',
				linkDesc:'Android Only contac me for PC',
				link:"https://dl.dropboxusercontent.com/u/113094663/Downloads/myapp.apk"

			}
		],
		[
			{
				name:'Shoot the Zombies',
				info:'XNA Game',
				image:'images/shoot.png',
				class:'image fit from-left',
				linkDesc:'Download it now!',
				link:'http://gamejolt.com/games/shoot-the-zombie/78631'
				//something:"<a href='https://dl.dropboxusercontent.com/u/113094663/webgl/Sprites/index.html>Play it!</a>"
			},
			{
				name:"Fallen Robot (Unity)",
				info:"Made in 2014 for GGJ 2014",
				image:'images/fallen.png',
				class:'image fit from-right',
				linkDesc:'Download (Pc)',
				link:"http://ggj.s3.amazonaws.com/games/2014/01/27/1440/FallenRobot.zip"

			}
		],
		[
			{
				name:'Super Aventura Animal',
				info:'Game made in a school project',
				image:'images/aventura.png',
				class:'image fit from-left',
				linkDesc:'Download it now!',
				link:'https://dl.dropboxusercontent.com/u/113094663/Downloads/SAA.rar'
				//something:"<a href='https://dl.dropboxusercontent.com/u/113094663/webgl/Sprites/index.html>Play it!</a>"
			},
			{
				name:"My Poor Little Heart",
				info:"Made in 2013 for GGJ 2013",
				image:'images/corazon.png',
				class:'image fit from-right',
				linkDesc:'Download (Pc)',
				link:"http://2013.globalgamejam.org/sites/default/files/%5Bcurrent-date%3Acustom%3AY%5D/%5Bcurrent-page%3Atitle%5D/download/MPCRelease.zip"

			}
		],
		[
			{
				name:'Animal Mess',
				info:'Made in GGJ 2015',
				image:'images/animalmess.png',
				class:'image fit from-left',
				linkDesc:'Download it now!',
				link:'http://ggj.s3.amazonaws.com/games/2015/01/27/0209/Game.zip'
				//something:"<a href='https://dl.dropboxusercontent.com/u/113094663/webgl/Sprites/index.html>Play it!</a>"
			},
			{
				name:"AR App (Unity3D)",
				info:"Made for Ajba Software",
				image:'images/ar.png',
				class:'image fit from-right',
				linkDesc:'Watch (Youtube)',
				link:"https://www.youtube.com/watch?v=fbzZosSbNkA"

			}
		]
	];
	
}]);