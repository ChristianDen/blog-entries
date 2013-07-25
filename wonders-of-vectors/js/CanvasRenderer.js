/*
 * (C) Christian Schlosrich 2012
 * CanvasRenderer is a rendering engine providing API calls for the RequestAnimationFrame polyfill
 * Decouples the canvas rendering functions and RequestAnimationFrame handlers from the rest of your code.
 * Also provides delta time (miliseconds between each render cycle) to make animaton speed independant of frame rate
 */
var CanvasRenderer = function(update, canvas){

	var callback = update,
		isRendering = false,
		ms,
		lastTime;

	this.canvas = canvas;
	this.ctx = this.canvas.getContext('2d');
	this.frame = 0;
	this.deltaTime = 0;
	this.clearOnUpdate = true;

    var canvasWidth = this.canvas.width,
        canvasHeight = this.canvas.height;

	this.start = function(){
		if(isRendering){
			return;
		}

		isRendering = true;
		this.frame = requestAnimationFrame( callback );
	};

	this.stop = function(){
		if(!isRendering){
			return;
		}

		isRendering = false;
		cancelRequestAnimationFrame( this.frame );
	};

	this.update = function(){
		if(!isRendering){
			return;
		}

		var now = new Date().getTime();
		ms = now - (lastTime || now);
		lastTime = now;

		if(this.clearOnUpdate){
			this.clearCanvas();
		}

		this.frame = requestAnimationFrame(callback);
		this.deltaTime = ms / 1000;
	};

	this.clearCanvas = function(){
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	};

	this.toggle = function(){
		if(isRendering){
			this.stop();
			return false;
		} else{
			this.start();
			return true;
		}
	};

	this.isRendering = function(){
		return isRendering;
	};

	this.getFps = function(){
		return Math.round( 1000 / ms);
	};

	this.getMs = function(){
		return ms;
	};

	// Provides requestAnimationFrame in a cross browser way. Eric Moeller variation
	// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];

    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelRequestAnimationFrame = window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if(!window.requestAnimationFrame){
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));

            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);

            lastTime = currTime + timeToCall;
            return id;
        }
    }

    if(!window.cancelRequestAnimationFrame){
        window.cancelRequestAnimationFrame = function(id) {
            clearTimeout(id);
        }
    }
};