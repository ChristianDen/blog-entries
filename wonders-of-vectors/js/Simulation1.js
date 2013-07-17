var Simulation1 = function(container){

    var MAX_BALLS = 1000,

        world = new World(640, 360, 1),
        renderer,
        canvas,
        ctx,
        bodies = [],
        floor,
        spawnTimerId,
        stats = container.querySelector('#stats'),
        count = 0;

    this.toggleRender = function(el){
        var r = renderer.toggle();
        toggleSpawn(r);

        if(r){
            el.innerHTML = 'Pause';
        } else{
            el.innerHTML = 'Resume';
        }
    };

    var toggleSpawn = function(flag){
        if(flag){
            spawnTimerId = setInterval(addBall, 1000 / 4);
            addBall();
        } else{
            clearInterval(spawnTimerId);
        }
    };

    var addBall = function(){
        if(bodies.length == MAX_BALLS){
            toggleSpawn(false);
        }

        var ball = new Ball(world.width / 2, world.tl.y - 50, (Math.random() * 20) -10, 0);
        ball.name = "ball";
        bodies.unshift(ball);

        count++;
    };

    var render = function(){
        renderer.update();
        draw();
        displayStats();
    };

    var draw = function() {

        var i, j, rBody, len = bodies.length;

        for(i = 0; i < len; i++) {

            rBody = bodies[i];

            rBody.update(
                world.gravity,
                renderer.deltaTime,
                world.ppm
            );

            // Collision detect
            for(j = i + 1; j < len; j++) {
                bodies[j].collide(rBody);
            }

            // Mark balls out of world bounds for garbage collection
            if(rBody.name == 'ball'){
                if(rBody.p.x < -rBody.r || rBody.p.x - rBody.r > world.width){
                    rBody.gc = true;
                }
            }

            rBody.draw(ctx);
        }

        // Removing bodies marked for collection
        for(var k = 0; k < len; k++) {
            if(bodies[k] && bodies[k].gc){
                bodies.splice(k, 1);
            }
        }
    };

    var displayStats = _.throttle(function(){
        stats.innerHTML =
            'Rigid bodies currently rendered: ' + bodies.length + '<br>' +
            'Rigid bodies created: ' + count + '<br>' +
            'Delta time: ' + (renderer.deltaTime * 1000) + '<br>' +
            'FPS: ' + renderer.getFps() + '<br>';
    }, 500);

    var init = function(){
        canvas = container.querySelector('canvas');
        canvas.style.border = 'solid 1px #3369ff';
        canvas.style.display = 'block';
        canvas.style.backgroundColor = '#fff';
        canvas.width = world.width;
        canvas.height = world.height;

        ctx = canvas.getContext('2d');

        floor = new Floor(0, world.height - 50, 0, 0);
        bodies.push(floor);

        renderer = new CanvasRenderer(render, canvas);
        renderer.start();

        toggleSpawn(renderer.isRendering);
    };

    init();
};