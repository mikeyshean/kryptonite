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
    this.image.src = 'assets/images/kryptonite.png'
  };

  Kryptonite.MAX_HEIGHT = 240;
  Kryptonite.MIN_HEIGHT = 30;
  Kryptonite.WIDTH = 40;
  Kryptonite.GAP = 88;
  Kryptonite.COLLISION_PADDING = 3;


  Kryptonite.prototype.draw = function () {
    var padding = Kryptonite.COLLISION_PADDING

    // Draws collision paths
    // ctx.strokeRect(this.topPos[0], this.topPos[1], this.width, this.topHeight)
    ctx.drawImage(
      this.image,
      0,
      400 - this.topHeight - padding,
      50,
      this.topHeight + padding,
      this.topPos[0],
      this.topPos[1],
      this.width + padding,
      this.topHeight + padding
    );

    // Draws collision paths
    // ctx.strokeRect(this.bottomPos[0], this.bottomPos[1], this.width, this.bottomHeight)
    ctx.drawImage(
      this.image,
      65,
      38,
      50,
      this.bottomHeight + padding,
      this.bottomPos[0],
      this.bottomPos[1] - padding,
      this.width + padding,
      this.bottomHeight + padding
    );
  };

  Kryptonite.prototype.move = function () {
    this.topPos[0] -= 2.6;
    this.bottomPos[0] -= 2.6;
  };

  Kryptonite.prototype.isOffScreen = function () {
    return this.topPos[0] + this.width < 0
  };

  Kryptonite.prototype.sideCollision = function (bird) {
    return (this.topPos[0] < bird.pos[0]) &&
            (this.topPos[0] >= bird.backPos[0]) &&
            (bird.topPos[1] < this.topHeight ||
              bird.backPos[1] > this.topHeight + Kryptonite.GAP)
  };

  Kryptonite.prototype.gapCollision = function (bird) {
    return (bird.pos[0] < this.topPos[0] + this.width) &&
            (bird.pos[0] > this.topPos[0]) &&
            (bird.topPos[1] < this.topPos[1] ||
             bird.pos[1] > this.bottomPos[1])
  };

  Kryptonite.prototype.trigCollision = function (bird) {
    var xRightCorner = this.topPos[0] + this.width;
    return (bird.pos[0] > xRightCorner) &&
            (bird.backPos[0] < xRightCorner) &&
            (bird.backPos[1] > this.bottomPos[1] ||
            (xRightCorner - bird.backPos[0]) > (bird.backPos[1] - this.topHeight))
  };
})();
