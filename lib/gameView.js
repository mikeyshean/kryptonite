(function () {

  window.Flappy = window.Flappy || {};

  var GameView = window.Flappy.GameView = function (options) {
    this.game = new Flappy.Game()
    this.ctx = options.ctx;
    this.audio = options.audio;
  };

  GameView.prototype.menu = function () {

    this.audio.currentTime = 46
    this.audio.play();

    var intervalId = setInterval(function () {
      this.game.drawMenu(this.ctx);

    }.bind(this), 20)

    $(window).on("keydown", function (e) {
      switch (e.which) {
        case 38:
          clearInterval(intervalId);
          $(window).off("keydown")
          this.run();
          break;
        default:
          return;
      }
    }.bind(this))
  };

  GameView.prototype.run = function () {
    var game = this.game
    game.bindKeys()
    game.addKryptonite()
    var intervalId = setInterval(function () {
      if (!game.paused) {
        game.step();
        game.draw(this.ctx);
      }

      if (game.gameOver) {
        clearInterval(intervalId);
        this.audio.pause();
        setTimeout(function () {
          game.reset();
          this.menu();
        }.bind(this), 3000)
      }
    }.bind(this), 20)
  };


})();
