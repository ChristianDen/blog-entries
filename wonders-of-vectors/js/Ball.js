var Ball = function(x, y, vx, vy) {
    RidgidBody.call(this, x, y, vx, vy);

    var rMin = 3, rMax = 16;

    this.r = Math.floor(Math.random() * rMax) + rMin;
};

Ball.prototype = Object.create(RidgidBody.prototype);