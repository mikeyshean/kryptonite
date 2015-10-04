(function () {

  window.Flappy = window.Flappy || {};

  var GameView = window.Flappy.GameView = function (options) {
    this.game = new Flappy.Game()
    this.ctx = options.ctx
  };

  GameView.prototype.run = function () {
    this.game.addObstacle()
    setInterval(function () {
      if (!this.game.paused) {
        this.game.step();
        this.game.draw(this.ctx);
      }
    }.bind(this), 20)

    setInterval(function () {
      if (!this.game.paused) {
        this.game.addObstacle();
      }
    }.bind(this), 3000)
  }
})();
