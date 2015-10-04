(function () {

  window.Flappy = window.Flappy || {};

  var Kryptonite = window.Flappy.Kryptonite = function (options) {
    this.game = options.game
    this.topHeight = Math.random() * Kryptonite.MAX_HEIGHT + 20;
    this.bottomHeight = this.game.height - this.topHeight - Kryptonite.GAP;
    this.width = Kryptonite.WIDTH;
    this.topPos = [this.game.width, 0]
    this.bottomPos = [this.topPos[0], this.topPos[1] + this.topHeight + Kryptonite.GAP]
    this.image = new Image();
    this.image.src = 'images/kryptonite.png'
  };

  Kryptonite.MAX_HEIGHT = 200;
  Kryptonite.WIDTH = 45;
  Kryptonite.GAP = 100;

  Kryptonite.prototype.draw = function () {
    ctx.drawImage(
      this.image,
      50,
      400,
      -(this.width) - 5,
      -(this.topHeight),
      this.topPos[0],
      this.topPos[1],
      this.width + 5,
      this.topHeight
    );

    ctx.drawImage(
      this.image,
      63,
      38,
      this.width + 5,
      this.bottomHeight,
      this.bottomPos[0],
      this.bottomPos[1],
      this.width + 5,
      this.bottomHeight
    );
  };

  Kryptonite.prototype.move = function () {
    this.topPos[0] -= 3;
    this.bottomPos[0] -= 3;
  };

  Kryptonite.prototype.isOffScreen = function () {
    return this.topPos[0] + this.width < 0
  };

  Kryptonite.prototype.topCollision = function (bird) {
    return (this.topPos[0] < bird.pos[0] + bird.radius) &&
            (this.topPos[0] >= bird.pos[0]) &&
            (bird.pos[1] < this.topHeight ||
              bird.pos[1] > this.topHeight + Kryptonite.GAP)
  };

  Kryptonite.prototype.gapCollision = function (bird) {
    return (this.topPos[0] < bird.pos[0] + bird.radius) &&
            (this.topPos[0] + this.width > bird.pos[0] - bird.radius) &&
            (bird.pos[1] - bird.radius < this.topHeight ||
            bird.pos[1] + bird.radius > this.bottomPos[1])
  }
})();
