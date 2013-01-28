define([
  './ui/getGravity',
  'frozen/box2d/Box'
], function(getGravity, Box){

  var gravity = getGravity();

  var box = new Box({
    gravityY: gravity.y,
    gravityX: gravity.x
  });

  return box;

});