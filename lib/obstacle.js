(function () {

  window.Flappy = window.Flappy || {};

  var Obstacle = window.Flappy.Obstacle = function (options) {
    this.game = options.game
    this.topHeight = Math.random() * Obstacle.MAX_HEIGHT;
    this.bottomHeight = this.game.height - this.topHeight - Obstacle.GAP;
    this.width = Obstacle.WIDTH;
    this.topPos = [this.game.width, 0]
    this.bottomPos = [this.topPos[0], this.topPos[1] + this.topHeight + Obstacle.GAP]
  };

  Obstacle.MAX_HEIGHT = 300;
  Obstacle.WIDTH = 50;
  Obstacle.GAP = 100;

  Obstacle.prototype.draw = function () {
    ctx.fillStyle = "purple";
    ctx.fillRect(
      this.topPos[0],
      this.topPos[1],
      this.width,
      this.topHeight
    )

    ctx.fillRect(
      this.bottomPos[0],
      this.bottomPos[1],
      this.width,
      this.bottomHeight
    )
  };

  Obstacle.prototype.move = function () {
    this.topPos[0] -= 2;
    this.bottomPos[0] -= 2;
  }
})();
