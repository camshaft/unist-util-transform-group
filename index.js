var normalize = require('unist-util-transform').normalize;
var slice = [].slice;

module.exports = function createTransformGroup(passes) {
  passes = passes.map(normalize);

  return {
    enter: function(node) {
      var args = slice.call(arguments, 1);
      return passes.reduce(function(node, ins) {
        if (!node) return node;
        return ins.enter.apply(ins, [node].concat(args));
      }, node);
    },
    exit: function(node) {
      var args = slice.call(arguments, 1);
      return passes.reduce(function(node, ins) {
        if (!node) return node;
        return ins.exit.apply(ins, [node].concat(args));
      }, node);
    }
  };
};
