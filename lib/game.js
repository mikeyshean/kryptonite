(function () {

  window.Flappy = window.Flappy || {}

  var Game = window.Flappy.Game = function () {
    this.bird = new Flappy.Bird();
    this.allObjects = [this.bird];
    this.bindKeys();
    this.height = 400;
    this.width = 800;
    this.count = 0;
  };

  Game.GRAVITY = .2;

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, 800, 400);
    this.allObjects.forEach(function (object) {
      object.draw();
    })
    this.drawCount();
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
    this.tryAddKryptonite();
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

      }
    }.bind(this))
  };

  Game.prototype.bindKeys = function () {
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
   if (lastKryptonite.topPos[0] < this.width / 2 + 20) {
     this.addKryptonite();
     this.count++
   }
 }
})();
