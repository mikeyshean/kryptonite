(function () {

  window.Flappy = window.Flappy || {};

  var Util = Flappy.Util = {}

  var inherits = Util.inherits = function (childClass, parentClass) {
    function Surrogate () {};
    Surrogate.prototype = parentClass.prototype;
    childClass.prototype = new Surrogate();
  }
})
