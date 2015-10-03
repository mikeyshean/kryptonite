(function () {

  window.Flappy = window.Flappy || {}

  var Game = window.Flappy.Game = function () {
    this.bird = new Flappy.Bird();
    this.obstacles = [];
    this.bindKeys();
    this.height = 400;
    this.width = 800;
  };

  Game.GRAVITY = .2;

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, 800, 400);
    this.bird.draw();
    this.obstacles.forEach(function (obstacle) {
      obstacle.draw();
    })
  };

  Game.prototype.step = function () {
    this.bird.move();
    this.obstacles.forEach(function (obstacle) {
      obstacle.move();
    })
  };

  Game.prototype.addObstacle = function () {
    this.obstacles.push(new Flappy.Obstacle({ game: this }))
  };

  Game.prototype.togglePause = function () {
    this.paused = !this.paused
  }

  Game.prototype.bindKeys = function () {
    $(document).keydown(function(e) {
      switch (e.which) {
        case 38: // up
          console.log("up");
          this.bird.move(6.5)
          break;

        case 80: // pause
          this.togglePause();
          break;

        default:
          return;
     }
   }.bind(this))
  }
})();
