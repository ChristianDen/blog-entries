var Floor = function(x, y, vx, vy) {

    RidgidBody.call(this, x, y, vx, vy);

	this.m = RidgidBody.MAX_MASS;
	this.r = RidgidBody.MAX_RADIUS;

    this.py = this.r + this.p.y;

    console.log('floor py: ' + this.p.y)
};

Floor.prototype = Object.create(RidgidBody.prototype);

//Floor.prototype.draw = function(ctx){
//    ctx.save();
//    //ctx.fillRect(ctx.canvas.width / -2, floor, ctx.canvas.width, (ctx.canvas.height) - floor);
//
//    ctx.fillRect(this.p.x, this.p.y, ctx.canvas.width, (ctx.canvas.height) - 310);
//
//
//    //ctx.fillRect(this.p.x, this.p.y, ctx.canvas.width, ctx.canvas.height - this.p.y);
//
//    //ctx.fillRect(0, 160, ctx.canvas.width, ctx.canvas.height);
//
//    //console.log(  0, 0, ctx.canvas.width, ctx.canvas.height )
//    ctx.stroke();
//    ctx.restore();
//};

Floor.prototype.update = function(){
    this.p.x = 0;
    this.p.y = this.py;
};