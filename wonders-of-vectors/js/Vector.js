var Vector = function(x, y) {
    this.x = x;
    this.y = y;
};

Vector.prototype = {
    dot : function (v) {
        return this.x * v.x + this.y * v.y;
    },

    length : function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },

    normalize : function() {
        var s = 1 / this.length();
        this.x *= s;
        this.y *= s;
        return this;
    },

    multiply : function(s) {
        return new Vector(this.x * s, this.y * s);
    },

    add : function(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    },

    toString : function(){
        return '[Vector] x: ' + this.x + ', y: ' + this.y;
    }
};