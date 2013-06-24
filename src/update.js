define([
  'lodash'
], function(_){

  'use strict';

  var DYNAMIC_COLOR = 'rgba(0,255,0,0.4)';
  var SENSOR_CONTACT_COLOR = 'rgba(0,0,255,0.2)';

  return function(){
    _.forEach(this.entities, function(entity){
      if(entity.staticBody){
        return;
      }
      if(entity.hitSensor){
        entity.fillStyle = SENSOR_CONTACT_COLOR;
      } else {
        entity.fillStyle = DYNAMIC_COLOR;
      }
    });
  };

});