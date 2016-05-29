---
layout: post
title: "Building a tycoon game in AngularJS and WebGL - am I crazy?"
date: 2015-05-30
tags:
- gamedev
- html5

---



This is a question I keep asking myself almost every time I load up my computer to work on my upcoming tycoon game

To help remedy my doubts I will try to convince you the reader (and myself) why this is not crazy and instead convince you why this is awesome.

**Why build a game HTML5/Javascript in the first place?**

I build in Web technologies because it is what I am most skilled at. If you ever visit any game developer community you will see people post "what should I use to make my game?" and the response is almost always "what you are most comfortable with". I another reason for using Web tech is because I was a full time Web developer in the past so making games in it made sense because I would be improving my Javascript knowledge and graphic design skills. Speaking of graphic design, CSS3 and HTML5 can make great looking UI elements and scale up and down very easily. My game is UI intensive so having a web engine to deal with UI rendering is nice. A final caveat is that I can rapidly develop and port my game to many platforms which is a nice bonus. This includes changing the entire look of the game with just editing a CSS file.

**OK fine, but why AngularJS of all frameworks?!**

I use AngularJS because my tycoon game is UI first. I came to this conclusion when I was designing the UI, which is like 80% of my game and I was getting frustrated at how big this task would be (mapping interactions between game elements, creating an event loop etc..) and I said too myself "this would be so easy if it was just a restful/MVC app". Then it hit me, I could make this game like an app, AngularJS can use http requests to get all the game data off a local NODEJS server and display all the game data whiles also managing the top level game logic, menus, different screens etc. I did have to worry about data binding or maintaining a strict MVC model because angular handles it all for me using it's own robust digest loop. All I needed was to create the game logic and include a finite state machine, write some CSS and BOOM! I had a bare bones prototype up in a weekend. Throw in WebGL running BabylonJS as the games 3d world (which is told what to do by AngularJS) and I have the foundation for my tycoon game!

**Why don't you use like. A game engine for your game like Unity?**

So I avoided unity for 2 reasons.

* as stated before my game mostly UI and using such a dense engine for it seemed overkill for my needs.
* I do not like unity handling of UI, past unity projects I have worked on I always remember not having fun with the way its component model treats UI objects.

Any other engines I would not use because I am not familiar with any of them and due to the scope of this game I need to have a huge understanding of my development environment.

**You know WebGL is very limited compared to almost any other 3D tech right?**

This I am aware of this, however what I want off the technology is not very demanding as the games update loop is relatively slow and the 3d characters are just there to illustrate what's going on, this makes WebGL one of the few times it may be beneficial as it will have no issues with what the games demands off it.

Am I still crazy? *Probably*, but I wanted to share my thoughts with a larger community and see what more experienced developers think of my practices! I would ask like - [ ] o acknowledge that if this was another game I would NOT be using angularJS or even HTML5, I just found that for a slow-paced UI intensive game that this so far seems like the best fit for me!

Quick foot note about my game: you run a small newspaper business from the early 1920's all the way up too the near future (2050? Not decided yet) where it becomes a huge corporation. If you are interested you can read more here www.newspapertycoon.com
The game is only 20% complete as I am still laying down the core foundation, hence why I'd decided to make this post too see if anyone has incite to why this is still a crazy prospect that is doomed to fail.

Original article is on my website www.jamessimo.com/blog

**TL;DR**

 Comfortable with WebTech, HTML and CSS scale nicely and make for great looking UIs, my game needs a strict MVC and data binding model which I cannot find outside of the web. I am also insane.
