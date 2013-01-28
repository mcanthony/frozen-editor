define([
  'frozen/box2d/RectangleEntity',
  'frozen/box2d/PolygonEntity',
  'frozen/box2d/CircleEntity'
], function(Rectangle, Polygon, Circle){

  return {
    Rectangle: Rectangle,
    Polygon: Polygon,
    Circle: Circle
  };

});