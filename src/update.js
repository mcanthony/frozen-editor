define([
  'lodash'
], function(_){

  'use strict';

  var SENSOR_CONTACT_COLOR = 'rgba(0,0,255,0.2)';

  return function(){
    _.forEach(this.entities, function(entity){
      if(entity.staticBody){
        return;
      }
      var touching = _.any(entity.touching, function(touch){
        return touch;
      });
      if(touching){
        entity.fillStyle = SENSOR_CONTACT_COLOR;
      } else {
        entity.fillStyle = entity.originalFill;
      }
    });
  };

});