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
    this.topPos[0] -= 3;
    this.bottomPos[0] -= 3;
  };

  Obstacle.prototype.isOffScreen = function () {
    return this.topPos[0] + this.width < 0
  };

  Obstacle.prototype.topCollision = function (bird) {
    return (this.topPos[0] < bird.pos[0] + bird.radius) &&
            (this.topPos[0] >= bird.pos[0]) &&
            (bird.pos[1] < this.topHeight ||
              bird.pos[1] > this.topHeight + Obstacle.GAP)
  };

  Obstacle.prototype.gapCollision = function (bird) {
    return (this.topPos[0] < bird.pos[0] + bird.radius) &&
            (this.topPos[0] + this.width > bird.pos[0] - bird.radius) &&
            (bird.pos[1] - bird.radius < this.topHeight ||
            bird.pos[1] + bird.radius > this.bottomPos[1])
  }
})();
