(function () {

  window.Flappy = window.Flappy || {};

  var GameView = window.Flappy.GameView = function (options) {
    this.game = new Flappy.Game()
    this.ctx = options.ctx;
    this.themeSong = new Audio("assets/soundfx/superman_theme.mp3")
    this.gameOver = new Audio("assets/soundfx/game_over.mp3")
  };

  GameView.prototype.menu = function () {
    this.themeSong.currentTime = 46
    this.themeSong.play();
    
    var intervalId = setInterval(function () {
      this.game.drawMenu(this.ctx);

    }.bind(this), 20)

    this.bindKeys(intervalId);
  };

  GameView.prototype.run = function () {
    if (this.themeSong.paused) {
      this.themeSong.currentTime = 46
      this.themeSong.play();
    }
    var game = this.game
    game.reset();
    game.addKryptonite()

    this.ctx.lineJoin = "miter";
    this.ctx.lineWidth = 1;

    var intervalId = setInterval(function () {
      if (!game.paused) {
        game.step();
        game.draw(this.ctx);
      }

      if (game.gameOver) {
        game.draw(this.ctx, true)
        clearInterval(intervalId);
        this.themeSong.pause();
        this.gameOver.currentTime = 0;
        this.gameOver.play();
        setTimeout(function () {
          this.showScore();
          this.bindKeys()

        }.bind(this), 300)

      }
    }.bind(this), 20)
  };

  GameView.prototype.bindKeys = function (intervalId) {
    $(document).on("keydown", function (e) {
      switch (e.which) {
        case 38:
          clearInterval(intervalId);
          this.run();
          break;

        case 32:
          clearInterval(intervalId);
          this.run();
          break;
        default:
          return;
      }
    }.bind(this))

    $("#canvas").on("click", function () {
      clearInterval(intervalId);
      this.run();
    }.bind(this))
  };

  GameView.prototype.showScore = function () {
    ctx = this.ctx;
    ctx.fillStyle = "#2e5280"
    ctx.strokeStyle = "#2e5280"

    var rectX = 250;
    var rectY = 100;
    var rectWidth = 300;
    var rectHeight = 200;
    var cornerRadius = 10;

    ctx.lineJoin = "round";
    ctx.lineWidth = cornerRadius;

    ctx.strokeRect(
      rectX+(cornerRadius/2),
      rectY+(cornerRadius/2),
      rectWidth-cornerRadius,
      rectHeight-cornerRadius
    )

    ctx.fillRect(
      rectX+(cornerRadius/2),
      rectY+(cornerRadius/2),
      rectWidth-cornerRadius,
      rectHeight-cornerRadius
    )

    ctx.fillStyle = "#fff"
    ctx.font = "18px 'Press Start 2P'"

    var currentScore = this.game.currentCount
    var xCoord = 390
    if (currentScore >= 100 ) {
      xCoord = 372
    } else if (currentScore >= 10) {
      xCoord = 380
    }
    ctx.fillText("Score", 355, 140);
    ctx.fillText(currentScore, xCoord, 165);



    var bestScore = this.game.highestScore();
    xCoord = 390
    if (bestScore >= 100 ) {
      xCoord = 372
    } else if (bestScore >= 10) {
      xCoord = 380
    }
    ctx.fillText("Best", 365, 210);
    ctx.fillText(bestScore, xCoord, 235);

    ctx.font = "10px 'Press Start 2P'"
    ctx.fillText("Press (Space) to Play Again", 265, 275);
  };


})();
