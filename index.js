var transform = require('unist-util-transform');
var normalize = transform.normalize;

module.exports = function createTransformGroup(passes) {
  return function translator(opts) {
    return function mapper(root, file) {
      var instances = passes.map(function(fn) {
        return normalize(fn(opts, file, root));
      });

      return transform(root, {
        enter: function(node, index, parent) {
          return instances.reduce(function(node, ins) {
            return ins.enter(node, index, parent);
          }, node);
        },
        exit: function(node, index, parent) {
          return instances.reduce(function(node, ins) {
            return ins.exit(node, index, parent);
          }, node);
        }
      });
    };
  };
};
