
var canvas = document.querySelector('.constellation');

var config = {
    canvas: canvas,
    width: canvas.offsetWidth,
    height: canvas.offsetHeight,
    starsCount: 10,
    maxCountOfConnection: 1,
    starSize: 4,
    lineWidth: 1,
    color: 'rgba(200, 200, 200)'
};

function Star(config, x, y) {
    this.x = Math.random() * config.width;
    this.y = Math.random() * config.height;

    this.dx = (0.5 - Math.random())/3;
    this.dy = (0.5 - Math.random())/3;

    this.animate = function() {
        if (this.x < 0 || this.x > config.width) {
            this.dx = -this.dx;
        }

        if (this.y < 0 || this.y > config.height) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;
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
    this.canvas = config.canvas;
    this.canvas.width = config.width;
    this.canvas.height = config.height;

    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillStyle = config.color;
    this.ctx.strokeStyle = config.color;
    this.ctx.lineWidth = config.lineWidth;

    this.stars = new Array(config.starsCount).fill(null).map(
        function() {
            return new Star(config);
        }
    );

    this.lines = [];
    for (var i = 0 ; i < this.stars.length - config.maxCountOfConnection ; i++) {
        var connections = Math.round(Math.random() * config.maxCountOfConnection) || 1;
        for (var j = 1 ; j <= connections ; j++) {
            this.lines.push(new Line(this.stars[i], this.stars[i+j]));
        }
    }

    this.draw = function() {
        for (var i = 0 ; i < this.stars.length ; i++) {
            this.stars[i].draw(this.ctx);
        }
        for (i = 0 ; i < this.lines.length ; i++) {
            this.lines[i].draw(this.ctx);
        }
    };

    var self = this;
    this.animate = function () {
        requestAnimationFrame(function animate() {
            for (var i = 0 ; i < self.stars.length ; i++) {
                self.stars[i].animate();
            }

            self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
            self.draw();

            requestAnimationFrame(animate);
        });
    }
}

var c = new Constellation(config);
c.draw();
c.animate();