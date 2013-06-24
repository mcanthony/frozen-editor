define([
  './state',
  './ui/getGravity',
  './ui/displayJSON',
  './ui/toggleUndo',
  'lodash',
  'dojo/dom-class',
  'frozen/box2d/entities',
  'frozen/box2d/joints',
  'frozen/box2d/Box'
], function(state, getGravity, displayJSON, toggleUndo, _, domClass, entities, joints, Box){

  'use strict';

  var DYNAMIC_COLOR = 'rgba(0,255,0,0.4)';
  var ZONE_COLOR = 'rgba(255,0,0,0.2)';

  var geomId = 0;

  return function(){
    var errors = false;
    var gravity = getGravity();

    state.game.box.setGravity(gravity);
    state.game.removeBodies(_.toArray(state.game.entities));
    state.game.removeJoints(_.toArray(state.game.joints));

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
        obj.fillStyle = obj.fillStyle || ZONE_COLOR;
      }
      if(typeof obj.id === 'undefined' || obj.id === null){
        obj.id = geomId;
        geomId++;
      }

      if(!state.game.entities[obj.id]){
        var Entity = entities[obj.type];
        if(Entity){
          var ent = new Entity(_.cloneDeep(obj));
          state.game.addBody(ent);
        }
      } else {
        errors = true;
      }
    });

    _.forEach(state.joints, function(obj){
      var Joint = joints[obj.type];
      if(Joint){
        var joint = new Joint(_.cloneDeep(obj));
        state.game.addJoint(joint);
      }
    });

    if(errors){
      domClass.remove('duplicate-ids', 'hide');
    } else {
      domClass.add('duplicate-ids', 'hide');
    }

    displayJSON(state.entities);
    toggleUndo();
  };

});