define([
  './state',
  './Entities',
  './Joints',
  './ui/getGravity',
  './ui/displayJSON',
  './ui/toggleUndo',
  'lodash',
  'dojo/dom-class',
  'frozen/box2d/Box'
], function(state, Entities, Joints, getGravity, displayJSON, toggleUndo, _, domClass, Box){

  var DYNAMIC_COLOR = 'rgba(0,255,0,0.4)';
  var ZONE_COLOR = 'rgba(255,0,0,0.2)';

  var geomId = 0;

  return function(){
    var errors = false;
    var gravity = getGravity();

    state.game.box = new Box({
      gravityX: gravity.x,
      gravityY: gravity.y
    });

    state.game.entities = {};

    var max = _(state.entities).map(function(obj){
      var id = parseInt(obj.id, 10);
      return typeof id === 'undefined' || id === null || isNaN(id) ? -1 : id;
    }).max().value();

    if(max){
      geomId = max + 1;
    }

    _.forEach(state.entities, function(obj){
      if(!obj.staticBody && !obj.zone){
        obj.fillStyle = obj.fillStyle || DYNAMIC_COLOR;
      }
      if(obj.zone){
        obj.fillStyle = obj.fillStyle || ZONE_COLOR;
      }
      if(typeof obj.id === 'undefined' || obj.id === null){
        obj.id = geomId;
        geomId++;
      }

      if(!state.game.entities[obj.id]){
        var ent = new Entities[obj.type](_.cloneDeep(obj));
        state.game.entities[obj.id] = ent;
        if(!obj.zone){
          state.game.box.addBody(ent);
        }
      } else {
        errors = true;
      }
    });

    _.forEach(state.joints, function(obj){
      var joint = new Joints[obj.type](_.cloneDeep(obj));
      state.game.box.addJoint(joint);
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