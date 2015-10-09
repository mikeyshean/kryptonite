(function () {

  window.Flappy = window.Flappy || {};

  var GameView = window.Flappy.GameView = function (options) {
    this.game = new Flappy.Game()
    this.ctx = options.ctx;
    this.themeSong = new Audio("assets/soundfx/superman_theme.mp3")
    this.gameOver = new Audio("assets/soundfx/game_over.mp3")
    this.$el = options.$el
    this.$leaderList = options.$leaderList
    this.$submitScore = this.$el.find(".submit")
    this.$restart = this.$el.find(".restart");

    if (typeof this.themeSong.loop == 'boolean') {
      this.themeSong.loop = true;
    } else {
      this.themeSong.addEventListener('ended', function () {
        this.currentTime = 46;
        this.play();
      })
    }

    this.getLeaders();
  };

  GameView.prototype.menu = function () {
    setTimeout(function () {
      this.themeSong.currentTime = 46;
      this.themeSong.play();
    }.bind(this), 0)

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

    var that = this
    var intervalId = setInterval(function () {
      if (!game.paused) {
        game.step();
        game.draw(that.ctx);
      }

      if (game.gameOver) {
        game.draw(that.ctx, true)
        clearInterval(intervalId);
        that.themeSong.pause();
        that.gameOver.currentTime = 0;
        that.gameOver.play();

        setTimeout(function () {
          that.showEndGame();
        }, 300)

      }
    }, 1000/60)
  };

  GameView.prototype.bindKeys = function (intervalId) {
    $(document).on("keydown", function (e) {
      switch (e.which) {
        case 38:
          e.preventDefault();
          clearInterval(intervalId);
          this.startGame();
          break;

        case 32:
          e.preventDefault();
          clearInterval(intervalId);
          this.startGame();
          break;
        default:
          return;
      }
    }.bind(this))

    $("#canvas").on("click", function (e) {
      e.preventDefault();
      clearInterval(intervalId);
      this.startGame();
    }.bind(this))
  };

  GameView.prototype.startGame = function () {
    this.$restart.hide();
    this.$submitScore.hide();
    this.$submitScore.off("click")
    this.$restart.off("click")
    this.run();
  };

  GameView.prototype.showScore = function () {
    ctx = this.ctx;
    ctx.fillStyle = "#2e5280"
    ctx.strokeStyle = "#2e5280"
    ctx.lineJoin = "round";
    ctx.lineWidth = 10;

    //outer score box
    Flappy.Util.roundRect(250, 100, 300, 200, 10)

    ctx.fillStyle = "#B42420";
    ctx.strokeStyle = "#B42420";

    // restart button
    Flappy.Util.roundRect(270, 245, 120, 45, 10)
    Flappy.Util.roundRect(410, 245, 120, 45, 10)

    ctx.fillStyle = "#fff"
    ctx.font = "18px 'Press Start 2P'"

    var currentScore = this.game.currentCount
    currentScore = currentScore > 0 ? currentScore - 1 : currentScore
    var xCoord = 393

    if (currentScore >= 100 ) {
      xCoord = 375
    } else if (currentScore >= 10) {
      xCoord = 383
    }
    ctx.fillText("Score", 358, 140);
    ctx.fillText(currentScore, xCoord, 165);

    var bestScore = this.game.highestScore();
    xCoord = 393
    if (bestScore >= 100 ) {
      xCoord = 375
    } else if (bestScore >= 10) {
      xCoord = 383
    }
    ctx.fillText("Best", 368, 200);
    ctx.fillText(bestScore, xCoord, 225);
  };

  GameView.prototype.submitScore = function (name) {
    var data = {}
    data["name"] = name
    data["score"] = this.game.highestScore();

    $.ajax({
     type: "POST",
     data: data,
     url:"https://ms-leaderboards.herokuapp.com/leaders",
     dataType: 'json',
     success:function(leaders){
         this.renderLeaderboard(leaders);
         this.game.bestCount = 0;
     }.bind(this)
   });
  };

  GameView.prototype.getLeaders = function () {

    $.ajax({
     type: "GET",
     url:"https://ms-leaderboards.herokuapp.com/leaders",
     dataType: 'json',
     success:function(leaders){
         this.renderLeaderboard(leaders);
     }.bind(this)
   });
  };

  GameView.prototype.renderLeaderboard = function (leaders) {
    this.$leaderList.empty();
    var name, score, rank, leader;

    for (var i = 0; i < 10; i++) {
      leader = leaders[i];
      rank = i + 1
      var $li = $("<li>").addClass("group")
      if (leader) {
        name = leader["name"];
        score = leader["score"];
      } else {
        name = "???"
        score = "???"
      }
      var $nameSpan = $("<span>" + rank + ".  " + name + "</span>");
      var $scoreSpan = $("<span>" + score + "</span>");
      (rank < 10) ? $nameSpan.addClass("padding") : ""
      $li.append($nameSpan).append($scoreSpan)
      this.$leaderList.append($li)

    }
  };

  GameView.prototype.showEndGame = function () {
    this.showScore();
    this.$restart.show();
    this.$submitScore.show();
    var that = this;

    this.bindKeys();
    this.$submitScore.one("click", function (e) {
      e.preventDefault();
      var bestScore = that.game.highestScore();
      that.submitScore(prompt("Score: " + bestScore, "Enter your name"));
      that.$restart.hide();
      that.$submitScore.hide();
      that.game.reset();
      that.menu();
    })

    this.$restart.one("click", function (e) {
      e.preventDefault();
      that.startGame();
    })
  }


})();
