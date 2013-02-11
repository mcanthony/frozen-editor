define([
  'frozen/box2d/joints/Distance',
  'frozen/box2d/joints/Prismatic',
  'frozen/box2d/joints/Revolute'
], function(Distance, Prismatic, Revolute){

  return {
    Distance: Distance,
    Prismatic: Prismatic,
    Revolute: Revolute
  };

});