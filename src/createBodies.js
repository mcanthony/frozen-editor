define([
  './state',
  './Entities',
  './ui/getGravity',
  './ui/displayJSON',
  './ui/toggleUndo',
  'lodash',
  'dojo/dom-class',
  'frozen/box2d/Box'
], function(state, Entities, getGravity, displayJSON, toggleUndo, _, domClass, Box){

  var SCALE = 30;
  var DYNAMIC_COLOR = 'rgba(0,255,0,0.4)';
  var ZONE_COLOR = 'rgba(255,0,0,0.2)';

  var geomId = 0;

  return function(){
    var errors = false;
    var gravity = getGravity();

    state.box = new Box({
      gravityX: gravity.x,
      gravityY: gravity.y
    });

    state.entities = {};

    var max = _.chain(state.jsonObjs).map(function(obj){
      var id = parseInt(obj.id, 10);
      return typeof id === 'undefined' || id === null || isNaN(id) ? -1 : id;
    }).max().value();

    if(max){
      geomId = max + 1;
    }

    _.forEach(state.jsonObjs, function(obj){
      if(!obj.staticBody && !obj.zone){
        obj.color = obj.color || DYNAMIC_COLOR;
      }
      if(obj.zone){
        obj.color = obj.color || ZONE_COLOR;
      }
      if(typeof obj.id === 'undefined' || obj.id === null){
        obj.id = geomId;
        geomId++;
      }

      if(!state.entities[obj.id]){
        var ent = new Entities[obj.type](obj);
        ent.scaleShape(1 / SCALE);
        state.entities[obj.id] = ent;
        if(!obj.zone){
          state.box.addBody(ent);
        }
      } else {
        errors = true;
      }
    });

    if(errors){
      domClass.remove('duplicate-ids', 'hide');
    } else {
      domClass.add('duplicate-ids', 'hide');
    }

    displayJSON(state.jsonObjs);
    toggleUndo();
  };

});