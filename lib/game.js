(function () {

  window.Flappy = window.Flappy || {}

  var Game = window.Flappy.Game = function () {
    this.bird = new Flappy.Bird();
    this.allObjects = [this.bird];
    this.bindKeys();
    this.height = 400;
    this.width = 800;
  };

  Game.GRAVITY = .2;

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, 800, 400);
    this.allObjects.forEach(function (object) {
      object.draw();
    })
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.addObstacle = function () {
    this.allObjects.push(new Flappy.Obstacle({ game: this }))
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
 }
})();
