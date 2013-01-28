define([
  './state',
  './Entities',
  './ui/getGravity',
  './ui/displayJSON',
  './ui/toggleUndo',
  'lodash',
  'frozen/box2d/Box'
], function(state, Entities, getGravity, displayJSON, toggleUndo, _, Box){

  var SCALE = 30;
  var DYNAMIC_COLOR = 'rgba(0,255,0,0.4)';
  var ZONE_COLOR = 'rgba(255,0,0,0.2)';

  var geomId = 0;

  return function(){
    var gravity = getGravity();

    state.box = new Box({
      gravityX: gravity.x,
      gravityY: gravity.y
    });

    state.entities = {};

    _.forEach(state.jsonObjs, function(obj){
      if(!obj.staticBody && !obj.zone){
        obj.color = obj.color || DYNAMIC_COLOR;
      }
      if(obj.zone){
        obj.color = obj.color || ZONE_COLOR;
      }
      if(!obj.geomId){
        obj.id = geomId;
        geomId++;
      }

      var ent = new Entities[obj.type](obj);
      ent.scaleShape(1 / SCALE);

      state.entities[obj.id] = ent;

      if(!obj.zone){
        state.box.addBody(ent);
      }
    });

    displayJSON(state.jsonObjs);
    toggleUndo();
  };

});