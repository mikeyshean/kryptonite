(function () {

  window.Flappy = window.Flappy || {};

  var Bird = window.Flappy.Bird = function () {
    this.pos = Bird.START_POS.slice();
    this.topPos = [this.pos[0], this.pos[1] - Bird.DIM];
    this.backPos = [this.pos[0] - Bird.DIM, this.pos[1]];
    this.dim = Bird.DIM;
    this.vel = Bird.START_VEL.slice();
    this.i = this.pos[0];
    this.image = new Image();
    this.image.src = 'assets/images/chubby-superman.png'
    this.flySound = new Audio();
    this.flySound.src = 'assets/soundfx/fly.m4a'
  };

  Bird.DIM = 33;
  Bird.COLOR = "green";
  Bird.MAX_VEL = -5.5;
  Bird.START_POS = [400, 200];
  Bird.START_VEL = [0 , 0];

  Bird.prototype.draw = function () {
    var yVel = this.vel[1]
    var sx;
    var sy;
    // ctx.strokeStyle = "#fff"
    ctx.beginPath();

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
      this.pos[0] - Bird.DIM,
      this.pos[1] - Bird.DIM,
      40,
      40
    );

    // ctx.moveTo(this.pos[0], this.pos[1]);
    // ctx.lineTo(this.topPos[0], this.topPos[1])
    // ctx.lineTo(this.backPos[0], this.backPos[1])
    // ctx.closePath();
    // ctx.stroke();
  };

  Bird.prototype.move = function (dir, floating) {
    if (dir) {
      if (!floating) {
        this.flySound.currentTime = 0;
        this.flySound.play();
      }
      if (this.vel[1] - dir > Bird.MAX_VEL) {
        this.vel[1] -= dir
      } else {
        this.vel[1] = Bird.MAX_VEL
      }
    }
    this.vel[1] += Flappy.Game.GRAVITY
    this.pos[1] += this.vel[1]
    this.topPos[1] += this.vel[1]
    this.backPos[1] += this.vel[1]
  };

  Bird.prototype.isCollidedWith = function (kryptonite) {
    return kryptonite.sideCollision(this) ||
            kryptonite.gapCollision(this) ||
            kryptonite.trigCollision(this)
  };

  Bird.prototype.isGone = function () {
    return this.pos[1] > 400
  };

  Bird.prototype.reset = function () {
    this.pos = Bird.START_POS.slice();
    this.topPos = [this.pos[0], this.pos[1] - Bird.DIM];
    this.backPos = [this.pos[0] - Bird.DIM, this.pos[1]];
    this.vel = Bird.START_VEL.slice();
  }

  Bird.prototype.isOffScreen = function () {
    // used for kryptonite removal
  };
})();
