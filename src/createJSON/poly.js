define([
  '../state',
  '../utils/convexHull',
  'frozen/utils'
], function(state, convexHull, utils){

  'use strict';

  return function(currentGeom){
    if(currentGeom && currentGeom.length > 2){
      var points = convexHull(currentGeom);

      var poly = {
        points: points
      };

      var avg = utils.averagePoints(poly.points);
      poly.x = avg.x;
      poly.y = avg.y;

      poly.points = utils.translatePoints(poly.points, {
        x: -poly.x,
        y: -poly.y
      });

      poly.staticBody = state.createType === 'static';
      poly.sensor = state.sensor;
      poly.type = 'Polygon';

      return poly;
    }
  };

});