define([
  '../state',
  'frozen/utils'
], function(state, utils){

  'use strict';

  return function(currentGeom){
    if(currentGeom && currentGeom.length === 2){
      var dist = utils.distance(currentGeom[0], currentGeom[1]);
      var circ = {
        x: currentGeom[0].x,
        y: currentGeom[0].y,
        radius: dist
      };
      circ.staticBody = state.options === 'static';
      circ.sensor = state.sensor;
      circ.type = 'Circle';

      return circ;
    }
  };

});