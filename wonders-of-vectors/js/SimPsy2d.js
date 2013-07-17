var SimPsy2d = function(container){

    var MAX_BALLS = 1000,

        world = new World(640, 360, 1),
        renderer,
        canvas,
        ctx,
        balls = [],
        spawnTimerId,
        stats = container.querySelector('#stats');

    this.toggleRender = function(el){
        var r = renderer.toggle();
        toggleSpawn(r);

        if(r){
            el.innerHTML = 'Pause';
        } else{
            el.innerHTML = 'Resume';
        }
    };

    function toggleSpawn(flag){
        if(flag){
            spawnTimerId = setInterval(addBall, 1000 / 4);
            addBall();
        } else{
            clearInterval(spawnTimerId);
        }
    };

    function addBall(){
        if(balls.length == MAX_BALLS){
            toggleSpawn(false);
        }

        var ball = new Ball(world.width / 2, world.tl.y - 50, (Math.random() * 20) -10, 0);
        balls.unshift(ball);
    };

    function render(){
        renderer.update();
        draw();
    };

    function draw() {
        var i, j, ball, len = balls.length;

        for(i = 0; i < len; i++) {

            ball = balls[i];
            ball.update(world.gravity, renderer.deltaTime, world.ppm);

            // Collision detect
            for(j = i + 1; j < len; j++) {
                balls[j].collide(ball);
            }

            // Remove balls out of stage
            if(ball.p.x < 0 || ball.p.x > world.width){
                //balls.splice(i, 1);
                ball.gc = true;
            }

            ball.draw(ctx);
        }

        // Removing balls in the draw loop causes flickering.
        // A second loop removes balls marked for collection
        // Performance wise not a good move...  But hey it works!
        for(var k = 0; k < len; k++) {
            if(balls[k] && balls[k].gc){
                balls.splice(k, 1);
            }
        }

        displayStats();
    };

    function displayStats(){
        stats.innerHTML = 'Balls on stage: ' + balls.length + '<br>' +
            'Delta time: ' + (renderer.deltaTime * 1000) + '<br>' +
            'FPS: ' + renderer.getFps() + '<br>';
    };

    function init(){
        canvas = document.createElement('canvas');
        canvas.style.border = 'solid 1px #3369ff';
        canvas.style.display = 'block';
        canvas.style.backgroundColor = '#fff';
        canvas.width = world.width;
        canvas.height = world.height;

        ctx = canvas.getContext('2d');
        document.getElementById('container').appendChild(canvas);

        // add the floor
        balls.push(new Floor(world.height));

        renderer = new CanvasRenderer(render, canvas);
        renderer.start();

        toggleSpawn(renderer.isRendering);
    };

    init();
};