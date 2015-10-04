(function () {

  window.Flappy = window.Flappy || {};

  var GameView = window.Flappy.GameView = function (options) {
    this.game = new Flappy.Game()
    this.ctx = options.ctx
  };

  GameView.prototype.run = function () {
    this.game.addKryptonite()
    setInterval(function () {
      if (!this.game.paused) {
        this.game.step();
        this.game.draw(this.ctx);
      }
    }.bind(this), 20)
  }
})();
