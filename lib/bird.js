(function () {

  window.Flappy = window.Flappy || {};

  var Bird = window.Flappy.Bird = function () {
    this.pos = [400, 150];
    this.radius = Bird.RADIUS;
    this.vel = [0 , 0];
    this.i = this.pos[0];
  };

  Bird.RADIUS = 20;
  Bird.COLOR = "green";
  Bird.MAX_VEL = -5.5;

  Bird.prototype.draw = function () {
    ctx.fillStyle = Bird.COLOR;

    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      Math.PI * 2,
      true
    );

    ctx.fill();
  };

  Bird.prototype.move = function (dir) {
    if (dir) {
      if (this.vel[1] - dir > Bird.MAX_VEL) {
        this.vel[1] -= dir
      } else {
        this.vel[1] = Bird.MAX_VEL
      }
    }
    this.vel[1] += Flappy.Game.GRAVITY
    this.pos[1] += this.vel[1]

    // temporarily reset pos
    if (this.pos[1] + this.radius > 400) {
      this.pos[1] = 150;
      this.vel = [0 , 0];
      Flappy.Game.GRAVITY = 0;
    }
  };

  Bird.prototype.isCollidedWith = function (obstacle) {
    return obstacle.topCollision(this) || obstacle.gapCollision(this)
  };

  Bird.prototype.isOffScreen = function () {
    // bird is never off screen
  }
})();
