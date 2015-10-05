(function () {

  window.Flappy = window.Flappy || {};

  var Util = Flappy.Util = function () {}

  var roundRect = Util.roundRect = function (rectX, rectY, rectWidth, rectHeight, cornerRadius) {
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
  }
})();
