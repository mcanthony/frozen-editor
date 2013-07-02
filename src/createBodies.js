define([
  './state',
  './ui/getGravity',
  './ui/displayJSON',
  './ui/toggleUndo',
  'lodash',
  'put',
  'frozen/box2d/entities',
  'frozen/box2d/joints',
  'frozen/box2d/Box'
], function(state, getGravity, displayJSON, toggleUndo, _, put, entities, joints, Box){

  'use strict';

  var DYNAMIC_COLOR = 'rgba(0,255,0,0.4)';
  var SENSOR_COLOR = 'rgba(255,0,0,0.2)';

  var geomId = 0;

  var msgEl;

  return function(){
    if(!msgEl){
      msgEl = document.getElementById('msg');
    }

    var self = this;
    var errors = false;
    var gravity = getGravity();

    self.box.setGravity(gravity);
    self.removeBodies(_.toArray(self.entities));
    self.removeJoints(_.toArray(self.joints));

    var max = _(state.entities).map(function(obj){
      var id = parseInt(obj.id, 10);
      return typeof id === 'undefined' || id === null || isNaN(id) ? -1 : id;
    }).max().value();

    if(max){
      geomId = max + 1;
    }

    _.forEach(state.entities, function(obj){
      if(!obj.staticBody && !obj.sensor){
        obj.fillStyle = obj.fillStyle || DYNAMIC_COLOR;
      }
      if(obj.sensor){
        obj.fillStyle = obj.fillStyle || SENSOR_COLOR;
      }
      if(typeof obj.id === 'undefined' || obj.id === null){
        obj.id = geomId;
        geomId++;
      }

      if(!self.entities[obj.id]){
        var Entity = entities[obj.type];
        if(Entity){
          var ent = new Entity(_.cloneDeep(obj));
          ent.originalFill = ent.fillStyle;
          ent.touching = {};
          self.addBody(ent);
        }
      } else {
        errors = true;
      }
    });

    _.forEach(state.joints, function(obj){
      var Joint = joints[obj.type];
      if(Joint){
        var joint = new Joint(_.cloneDeep(obj));
        self.addJoint(joint);
      }
    });

    if(errors){
      put(msgEl, '.error', 'Duplicate IDs found, please double check your IDs');
    } else {
      put(msgEl, '!error', {
        textContent: ''
      });
    }

    displayJSON();
    toggleUndo();
  };

});