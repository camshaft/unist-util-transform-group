var normalize = require('unist-util-transform').normalize;

module.exports = function createTransformGroup(passes) {
  passes = passes.map(normalize);

  return {
    enter: function(node, index, parent) {
      return passes.reduce(function(node, ins) {
        return ins.enter(node, index, parent);
      }, node);
    },
    exit: function(node, index, parent) {
      return passes.reduce(function(node, ins) {
        return ins.exit(node, index, parent);
      }, node);
    }
  };
};
