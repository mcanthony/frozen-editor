define([
  './state',
  './createJSON/main',
  './ui/displayJSON',
  'lodash',
  'frozen/utils'
], function(state, createJSON, displayJSON, _, utils){

  'use strict';

  var MAX_POLY_SIDES = 10;
  var POINT_RADIUS = 4;

  var xdisp = document.getElementById('xdisp');
  var ydisp = document.getElementById('ydisp');

  var mp;

  var movingShape;
  var movingEntity;

  return function(im){

    var self = this;

    if(im.mouseAction.position){
      xdisp.innerHTML = im.mouseAction.position.x;
      ydisp.innerHTML = im.mouseAction.position.y;
    }

    // mouse pressed
    if(im.mouseAction.isPressed() && im.insideCanvas(im.mouseAction.startPosition) && !mp){
      if(state.tool === 'move'){
        if(!movingShape){
          movingShape = _.last(_.where(state.entities, function(obj){
            return self.entities[obj.id].pointInShape({
              x: im.mouseAction.startPosition.x / self.box.scale,
              y: im.mouseAction.startPosition.y / self.box.scale
            });
          }));
          console.log(movingShape);
          if(movingShape){
            movingEntity = this.entities[movingShape.id];
          }
        }
        if(movingShape){
          movingShape.x = im.mouseAction.position.x;
          movingShape.y = im.mouseAction.position.y;
          if(movingShape.staticBody){
            movingEntity.x = movingShape.x / this.box.scale;
            movingEntity.y = movingShape.y / this.box.scale;
            this.box.removeBody(movingEntity.id);
            this.box.addBody(movingEntity);
          } else {
            this.box.setPosition(movingEntity.id, movingShape.x / this.box.scale, movingShape.y / this.box.scale);
            this.box.setLinearVelocity(movingEntity.id, 0, 0);
            this.box.setAngularVelocity(movingEntity.id, 0);
          }
          displayJSON();
        }
      } else {
        mp = im.mouseAction.startPosition;
        console.log('start ' + state.create, mp);
        state.geometries.push(mp);
      }
    }

    //mouse released
    if(!im.mouseAction.isPressed() && im.mouseAction.endPosition){
      if(state.tool === 'move' && movingEntity){
        this.box.removeBody(movingEntity.id);
        this.box.addBody(movingEntity);
        movingShape = movingEntity = null;
        displayJSON();
      } else if(mp){
        mp = im.mouseAction.endPosition;

        if(state.create === 'polygon' && state.geometries.length !== MAX_POLY_SIDES && (state.geometries.length <= 1 || utils.distance(state.geometries[0], mp) > POINT_RADIUS)){
          mp = null;
          return;
        }

        state.geometries.push(mp);
        state.entities.push(createJSON[state.create](state.geometries));
        this.createBodies();
        state.geometries = [];

        im.mouseAction.endPosition = null;
        mp = null;
      }
    }
  };

});