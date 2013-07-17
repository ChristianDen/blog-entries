var Floor = function(floor) {
	var py;
  
	this.v = new Vector(0, 0);
	this.m = 5.9722 * Math.pow(10, 24); // Mass of the Earth
	this.r = 10000000;
	this.p = new Vector(0, py = this.r + floor);

	this.update = function() {
		this.v.x = 0;
		this.v.y = 0;
		this.p.x = 0;
		this.p.y = py;
	};
	
	this.draw = function(ctx) {
		ctx.save();
		ctx.fillRect(	ctx.canvas.width / -2, floor, ctx.canvas.width, (ctx.canvas.height) - floor);
		ctx.restore();
	}
};

Floor.prototype = new Ball();