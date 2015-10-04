(function () {

  window.Flappy = window.Flappy || {};

  var Bird = window.Flappy.Bird = function () {
    this.pos = Bird.START_POS.slice();
    this.radius = Bird.RADIUS;
    this.vel = Bird.START_VEL.slice();
    this.i = this.pos[0];
    this.image = new Image();
    this.image.src = 'images/chubby-superman.png'
  };

  Bird.RADIUS = 18;
  Bird.COLOR = "green";
  Bird.MAX_VEL = -5.5;
  Bird.START_POS = [380, 200];
  Bird.START_VEL = [0 , 0];

  Bird.prototype.draw = function () {
    var yVel = this.vel[1]
    var sx;
    var sy;
    ctx.strokeStyle = "#fff"
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      Math.PI * 2,
      true
    )
    ctx.stroke();

    if (yVel > 4 && yVel <= 8) {
      sx = 218;
      sy = 248;
    } else if (yVel > 8){
      sx = 0;
      sy = 214;
    } else {
      sx = 0;
      sy = 0;
    }


    ctx.drawImage(
      this.image,
      sx,
      sy,
      218,
      214,
      this.pos[0] - 20,
      this.pos[1] - 20,
      40,
      40
    );
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

  };

  Bird.prototype.isCollidedWith = function (kryptonite) {
    return kryptonite.topCollision(this) || kryptonite.gapCollision(this)
  };

  Bird.prototype.isGone = function () {
    return this.pos[1] + this.radius > 400
  };

  Bird.prototype.reset = function () {
    this.pos = Bird.START_POS.slice();
    this.vel = Bird.START_VEL.slice();
  }

  Bird.prototype.isOffScreen = function () {
    // used for kryptonite removal
  };
})();
