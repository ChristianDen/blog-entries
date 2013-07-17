var Ball = function(x, y, vx, vy) {
    this.p = new Vector(x || 0, y || 0);
    this.velocity = new Vector(vx || 0, vy || 0);
    this.m = 10; // mass: kg
    this.r = Math.round(5 + (Math.random() * (20 - 5)));
    this.cr = 0.618; // Bounciness: 0 - 1;
    this.rotation = 0;
    this.gc = false;
};

Ball.prototype = {

    draw : function(ctx) {
        ctx.save();
        
        ctx.translate(this.p.x, this.p.y);
        ctx.rotate(this.rotation);

        // Fill circle
        ctx.beginPath();
        //ctx.arc(this.p.x, this.p.y, this.r, 0, 2 * Math.PI);
        ctx.arc(0, 0, this.r, 0, 2 * Math.PI, false);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgb(33, 69, 233)';
        ctx.stroke();
        ctx.closePath();

        // Line
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(this.r, 0);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    },

    update : function(gravity, deltaTime, ppm) {
        this.velocity.y += gravity * deltaTime;
        this.p.x += this.velocity.x * deltaTime * ppm;
        this.p.y += this.velocity.y * deltaTime * ppm;
        this.rotation += this.velocity.x * 0.01;
    },

    collide : function(obj) {
        var dt, mT, v1, v2, cr, sm,
            dn = new Vector(this.p.x - obj.p.x, this.p.y - obj.p.y),
            sr = this.r + obj.r, // sum of radii
            dx = dn.length(); // pre-normalized magnitude

        if(dx > sr) {
            return; // no collision
        }

        // sum the masses, normalize the collision vector and get its tangential
        sm = this.m + obj.m;
        dn.normalize();
        dt = new Vector(dn.y, -dn.x);

        // avoid double collisions by "un-deforming" balls (larger mass == less tx)
        // this is susceptible to rounding errors, "jiggle" behavior and anti-gravity
        // suspension of the object get into a strange state
        mT = dn.multiply(this.r + obj.r - dx);
        this.p.add(mT.multiply(obj.m / sm));
        obj.p.add(mT.multiply(-this.m / sm));
         
        // this interaction is strange, as the CR describes more than just
        // the ball's bounce properties, it describes the level of conservation
        // observed in a collision and to be "true" needs to describe, rigidity, 
        // elasticity, level of energy lost to deformation or adhesion, and crazy
        // values (such as cr > 1 or cr < 0) for stange edge cases obviously not
        // handled here (see: http://en.wikipedia.org/wiki/Coefficient_of_restitution)
        // for now assume the ball with the least amount of elasticity describes the
        // collision as a whole:
        cr = Math.min(this.cr, obj.cr);

        // cache the magnitude of the applicable component of the relevant velocity
        v1 = dn.multiply(this.velocity.dot(dn)).length();
        v2 = dn.multiply(obj.velocity.dot(dn)).length(); 

        // maintain the unapplicatble component of the relevant velocity
        // then apply the formula for inelastic collisions
        this.velocity = dt.multiply(this.velocity.dot(dt));
        this.velocity.add(dn.multiply((cr * obj.m * (v2 - v1) + this.m * v1 + obj.m * v2) / sm));

        // do this once for each object, since we are assuming collide will be called 
        // only once per "frame" and its also more effiecient for calculation cacheing 
        // purposes
        obj.velocity = dt.multiply(obj.velocity.dot(dt));

        // Bounce
        obj.velocity.add(dn.multiply((cr * this.m * (v1 - v2) + obj.m * v2 + this.m * v1) / sm));
    }
};