define([
  '../state',
  '../utils/orderRectPts'
], function(state, orderRectPts){

  'use strict';

  return function(currentGeom){
    if(currentGeom && currentGeom.length === 2){
      var pts = orderRectPts(currentGeom);

      var rect = {
        x: ((pts[1].x - pts[0].x)/2 + pts[0].x),
        y: ((pts[1].y - pts[0].y)/2 + pts[0].y),
        halfWidth: Math.abs((pts[1].x - pts[0].x) / 2) || 0.5,
        halfHeight: Math.abs((pts[1].y - pts[0].y) / 2) || 0.5
      };
      rect.staticBody = state.toolType === 'static';
      rect.zone = state.toolType === 'zone';
      rect.type = 'Rectangle';

      return rect;
    }
  };

});