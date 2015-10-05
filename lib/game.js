(function () {

  window.Flappy = window.Flappy || {}

  var Game = window.Flappy.Game = function () {
    this.bird = new Flappy.Bird();
    this.allObjects = [this.bird];
    this.height = 400;
    this.width = 800;
    this.currentCount = 0;
    this.bestCount = 0;
    this.goingUp = true
  };

  Game.GRAVITY = .2;

  Game.prototype.draw = function (ctx, blankCount) {
    ctx.clearRect(0, 0, 800, 400);
    this.allObjects.forEach(function (object) {
      object.draw();
    })
    this.drawCount(blankCount);
  };

  Game.prototype.drawMenu = function (ctx) {
    ctx.clearRect(0, 0, 800, 400);
    this.floatBird();

    ctx.fillStyle = "#2AE249"
    ctx.strokeStyle = "#00CC00"
    ctx.font = "28px 'Press Start 2P'"
    ctx.fillText("Escape from Krypton", 135, 75);
    ctx.strokeText("Escape from Krypton", 135, 75);
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
      this.bird.move(1, true)
    } else {
      this.bird.move(0, true)
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
    $("#canvas").off("click");
    $(document).keydown(function(e) {

      switch (e.which) {
        case 38: // up
          this.bird.move(6.5)
          break;

        case 32: // up
          this.bird.move(6.5)
          break;

        case 80: // pause
          this.togglePause();
          break;

        default:
          return;
     }
   }.bind(this))

   $("#canvas").on("click", function () {
     this.bird.move(6.5)
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

  Game.prototype.drawCount = function (blankCount) {
   var text = (blankCount) ? "" : this.currentCount

   ctx.fillStyle = "#EA1821"
   ctx.strokeStyle = "#2e5280"
   ctx.font = "28px 'Press Start 2P'"
   ctx.fillText(text, 390, 75);
   ctx.strokeText(text, 390, 75);
  };

  Game.prototype.tryAddKryptonite = function () {
   var lastKryptonite = this.allObjects[this.allObjects.length - 1];
   if (lastKryptonite.topPos[0] < (this.width / 2) + 20) {
     this.addKryptonite();
     this.currentCount++
   }
 };

 Game.prototype.checkGameOver = function () {
   this.gameOver || (this.gameOver = this.bird.isGone())
 };

 Game.prototype.reset = function () {
   this.bird.reset();
   this.bindKeys()
   this.allObjects = [this.bird];
   this.gameOver = false;
   this.currentCount = 0;
 };

 Game.prototype.highestScore = function () {
   if (this.currentCount - 1 > this.bestCount) {
     this.bestCount = this.currentCount - 1
   }

   return this.bestCount;
 }
})();
