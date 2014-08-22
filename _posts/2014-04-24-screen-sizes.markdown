---
layout: post
title:  "Game design for multiple screens"
date:	2014-08-21
tags:
- html5
- gamedev
---

For my newest game mobile game [blockstacking] I was presented with many challenges with screen sizes, resolutions and pixel densities. I want to talk about some initial problems I was faced with and hopefully this can help some people. 

###Problem 1



The game text and objects look horrid. 
By horrid I mean blurry and un-focused, this is because I am developing on a Macbook Pro with a retina screen.
http://www.html5rocks.com/en/tutorials/canvas/hidpi/
This was fixed with 
When it comes to mobile HTML5 games there are a few new problems to solve when compared to desktop. For example managing the resize of the game area is very important, whether you’re rendering the game using DOM or Canvas. Noboby wants to play the game that takes only half of the screen, because everything would be just too small. On the other hand having the game area twice as the screen size and forcing user to scroll it is also a very bad idea. Resizing the game area to fit the device screen is the best solution in this situation. Let’s see what options we have right now.

````javascript
PIXEL_RATIO = (function () {
	    var ctx = io.context,
	        dpr = window.devicePixelRatio || 1,
	        bsr = ctx.webkitBackingStorePixelRatio ||
	              ctx.mozBackingStorePixelRatio ||
	              ctx.msBackingStorePixelRatio ||
	              ctx.oBackingStorePixelRatio ||
	              ctx.backingStorePixelRatio || 1;
	
	    return dpr / bsr;
	})();
````

lol
	
````javascript
this.onResize = function(event){
		io.canvas.width = GAMEWIDTH;
		io.canvas.height = GAMEHEIGHT;
		

		io.canvas.width = io.canvas.width*PIXEL_RATIO;
		io.canvas.height = io.canvas.height*PIXEL_RATIO;
		
		io.canvas.style.width = window.innerWidth + 'px';
		io.canvas.style.height = window.innerHeight + 'px';

	};	
````

###Problem 2

The well now that the fuzzy ness is gone there is a new problem that my game does not run at 60FPS on my S3, 
set it to 1.5

````javascript
if(PIXEL_RATIO > 1){
	PIXEL_RATIO = 1.5;
}else{
	PIXEL_RATIO = 1;
}
````

###Problem 3

Choosing game resolution, so this was a weird one if you have never had to design a game for mobile, this is easy if there was only one screen size.

###Problem 4 

Scaling your game and how I did some things differently. 
I followed Andrzej Mazur tutorial on scaling my HTML5 game, because I port all my games to CocoonJS Canvas+ I did all my scaling using pure javascript and opted to use the "stretch method".

Now as you can imagine my game now looks like this for wide screen devices

[[IMAGE]]

This is not good, so I could of implemented the "fit method" like this 

[[IMAGE]]

however for an iOS and Android game I feel that this is unacceptable, as this will be the case for all high end devices (iPhone 5/5S/5C, Samsung Galaxy 3/4/5 and blah blahc ) and I feel that people wont want to play a game that wont utilize the whole screen. 
To get around this I opted to do something strange, I kept the game logic in a 300px area and keep designing the game for 320x480 screen, then if the screen height is larger than 480, then set the screen height for the iPhone5 standard 568px. Then I auto adjust the game area so its always in the center this will then look perfect on all iPhone screens. 


[blockstacking]: https://github.com/mojombo/jekyll
[jekyll]:    http://jekyllrb.com
