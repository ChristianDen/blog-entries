/*
 * (C) Christian Schlosrich 2012
 * Defines the boundaries and psysics of your world (or game area)
 */
var World = function(width, height, scale){

	this.scale = scale || 1;
	this.width = width * this.scale;
	this.height = height * this.scale;

	// Strength of Earth's gravity acceleration measured as 9.81 meters per second. http://en.wikipedia.org/wiki/Gravitation
	this.gravity = 9.81;

	// Pixels per meter
	this.ppm = 20;

	// Storing key positions for handy retrival 
	this.tl 	= {x: 0, y: 0};	
	this.tc 	= {x: this.width / 2, y: 0};
	this.tr 	= {x: 0, y: this.height};
	this.cl 	= {x: 0, y: this.width / 2};
	this.center = {x: this.width / 2, y: this.width / 2};
	this.cr 	= {x: this.width, y: this.height / 2};
	this.bl 	= {x: 0, y: this.height};
	this.bc 	= {x: this.width / 2, y: this.height};
	this.br 	= {x: this.width, y: this.height};
};