(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var canvas = document.querySelector('.constellation');

var config = {
    canvas: canvas,
    width: canvas.offsetWidth,
    height: canvas.offsetHeight,
    stars: [
        [0, 0.4],
        [0.005, 0.8],
        [0.05, 0.6],
        [0.125, 0.1],
        [0.15, 0.7],
        [0.25, 0.45],
        [0.375, 0.2],
        [0.3, 0.9],

        [0.68, 0.02],
        [0.72, 0.18],
        [0.75, 0.43],
        [0.72, 0.7],
        [0.65, 0.65],
        [0.8, 0.98],
        [0.97, 0.7],
        [0.85, 0.4],
        [0.87, 0.2]
    ],
    lines: [
        [0, 2],
        [1, 2],
        [0, 3],
        [2, 4],
        [3, 5],
        [5, 6],
        [5, 7],

        [8, 9],
        [9, 10],
        [10, 11],
        [11, 12],
        [11, 13],
        [13, 14],
        [10, 15],
        [15, 16]
    ],
    starSize: 4,
    lineWidth: 1,
    color: 'rgba(200, 200, 200)'
};

function Star(config, x, y) {
    this.x = x;
    this.y = y;

    this.dx = (0.5 - Math.random())/5;
    this.dy = (0.5 - Math.random())/5;

    this.animate = function() {
        if (this.x < 5 || this.x > config.width-5) {
            this.dx = -this.dx;
        }

        if (this.y < 5 || this.y > config.height-5) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;
    };

    this.rotateAnimate = function() {
        this.dx = -this.dx;
        this.dy = -this.dy;
    };

    this.draw = function(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, config.starSize, 0, Math.PI*2, true);
        ctx.fill();
        ctx.closePath();
    }
}

function Line(star1, star2) {
    this.draw = function (ctx) {
        ctx.beginPath();
        ctx.moveTo(star1.x, star1.y);
        ctx.lineTo(star2.x, star2.y);
        ctx.stroke();
        ctx.closePath();
    }
}

function Constellation(config) {
    var self = this;

    this.canvas = config.canvas;
    this.canvas.width = config.width;
    this.canvas.height = config.height;

    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillStyle = config.color;
    this.ctx.strokeStyle = config.color;
    this.ctx.lineWidth = config.lineWidth;

    this.createStars = function(config) {
        return config.stars.map(function(coord) {
            return new Star(config, coord[0]*config.width, coord[1]*config.height);
        });
    };

    this.stars = this.createStars(config);

    this.createLines = function(config) {
        return config.lines.map(function(stars) {
            return new Line(self.stars[stars[0]], self.stars[stars[1]]);
        });
    };

    this.lines = this.createLines(config);

    this.draw = function() {
        for (var i = 0 ; i < this.stars.length ; i++) {
            this.stars[i].draw(this.ctx);
        }
        for (i = 0 ; i < this.lines.length ; i++) {
            this.lines[i].draw(this.ctx);
        }
    };

    this.counter = 0;

    this.animate = function () {
        requestAnimationFrame(function animate() {
            for (var i = 0 ; i < self.stars.length ; i++) {
                if (self.counter > 400) self.stars[i].rotateAnimate();
                self.stars[i].animate();
            }

            self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
            self.draw();

            if (self.counter > 400) self.counter = 0;
            self.counter++;

            requestAnimationFrame(animate);
        });
    };

    this.onResize = function() {
        config.width = canvas.offsetWidth;

        self.canvas.width = config.width;
        self.canvas.height = config.height;

        self.ctx = self.canvas.getContext('2d');
        self.ctx.fillStyle = config.color;
        self.ctx.strokeStyle = config.color;
        self.ctx.lineWidth = config.lineWidth;

        self.stars = self.createStars(config);
        self.lines = self.createLines(config);
    }
}

var c = new Constellation(config);
c.draw();
c.animate();

window.addEventListener('resize', c.onResize);