(function () {

  window.Flappy = window.Flappy || {};

  var Kryptonite = window.Flappy.Kryptonite = function (options) {
    this.game = options.game
    this.topHeight = Math.random() * Kryptonite.MAX_HEIGHT + Kryptonite.MIN_HEIGHT;
    this.bottomHeight = this.game.height - this.topHeight - Kryptonite.GAP;
    this.width = Kryptonite.WIDTH;
    this.topPos = [this.game.width, 0]
    this.bottomPos = [this.topPos[0], this.topPos[1] + this.topHeight + Kryptonite.GAP]
    this.image = new Image();
    this.image.src = 'images/kryptonite.png'
  };

  Kryptonite.MAX_HEIGHT = 240;
  Kryptonite.MIN_HEIGHT = 30;
  Kryptonite.WIDTH = 40;
  Kryptonite.GAP = 100;
  Kryptonite.COLLISION_PADDING = 10;


  Kryptonite.prototype.draw = function () {
    var padding = Kryptonite.COLLISION_PADDING

    ctx.strokeRect(this.topPos[0], this.topPos[1], this.width, this.topHeight)
    ctx.drawImage(
      this.image,
      50,
      400,
      -(this.width + padding),
      -(this.topHeight - padding),
      this.topPos[0],
      this.topPos[1],
      this.width + padding,
      this.topHeight + padding
    );
    ctx.strokeRect(this.bottomPos[0], this.bottomPos[1], this.width, this.bottomHeight)
    ctx.drawImage(
      this.image,
      63,
      38,
      this.width + padding,
      this.bottomHeight + padding,
      this.bottomPos[0],
      this.bottomPos[1] - padding,
      this.width + padding,
      this.bottomHeight + padding
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
