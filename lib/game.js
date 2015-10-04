(function () {

  window.Flappy = window.Flappy || {}

  var Game = window.Flappy.Game = function () {
    this.bird = new Flappy.Bird();
    this.allObjects = [this.bird];
    // this.bindKeys();
    this.height = 400;
    this.width = 800;
    this.count = 0;
    this.goingUp = true
  };

  Game.GRAVITY = .2;

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, 800, 400);
    this.allObjects.forEach(function (object) {
      object.draw();
    })
    this.drawCount();
  };

  Game.prototype.drawMenu = function (ctx) {
    ctx.clearRect(0, 0, 800, 400);
    this.floatBird();

    ctx.fillStyle = "#EA1821"
    ctx.strokeStyle = "#fff"
    ctx.font = "36px 'Press Start 2P'"
    ctx.fillText("Super Flight", 185, 75);
    ctx.strokeText("Super Flight", 185, 75);
    this.bird.draw();
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
    this.checkGameOver();
    this.tryAddKryptonite();
  };

  Game.prototype.floatBird = function () {
    var birdVel = this.bird.vel[1]
    if (this.goingUp) {
      this.bird.move(1)
    } else {
      this.bird.move()
    }

    if (birdVel < -1) {
      this.goingUp = false
    } else if (birdVel > 2) {
      this.goingUp = true;
    }
  };

  Game.prototype.addKryptonite = function () {
    this.allObjects.push(new Flappy.Kryptonite({ game: this }))
  };

  Game.prototype.togglePause = function () {
    this.paused = !this.paused
  };

  Game.prototype.checkCollisions = function () {
    this.allObjects.forEach(function (object) {
      if (object instanceof Flappy.Bird) { return; }

      if (this.bird.isCollidedWith(object)) {
        this.gameOver = true;
      }
    }.bind(this))
  };

  Game.prototype.bindKeys = function () {
    $(document).off("keydown")
    $(document).keydown(function(e) {
      switch (e.which) {
        case 38: // up
          this.bird.move(6.5)
          break;

        case 80: // pause
          this.togglePause();
          break;

        default:
          return;
     }
   }.bind(this))
  };

  Game.prototype.moveObjects = function () {
   this.allObjects.forEach(function (object) {
     if (object.isOffScreen()) {
       this.remove(object)
     } else {
       object.move();
     }
   }.bind(this))
  };

  Game.prototype.remove = function (object) {
   this.allObjects.splice(this.allObjects.indexOf(object), 1)
  };

  Game.prototype.drawCount = function () {
   ctx.fillStyle = "#EA1821"
   ctx.strokeStyle = "#2e5280"
   ctx.font = "28px 'Press Start 2P'"
   ctx.fillText(this.count, 390, 75);
   ctx.strokeText(this.count, 390, 75);
  };

  Game.prototype.tryAddKryptonite = function () {
   var lastKryptonite = this.allObjects[this.allObjects.length - 1];
   if (lastKryptonite.topPos[0] < (this.width / 2) + 20) {
     this.addKryptonite();
     this.count++
   }
 };

 Game.prototype.checkGameOver = function () {
   this.gameOver || (this.gameOver = this.bird.isGone())
 };

 Game.prototype.reset = function () {
   this.bird.reset();
   this.allObjects = [this.bird];
   this.gameOver = false;
   this.count = 0;
 }
})();
