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

  var selectedShape;
  var selectedEntity;

  return function(im){

    var self = this;

    if(im.mouseAction.position){
      xdisp.innerHTML = im.mouseAction.position.x;
      ydisp.innerHTML = im.mouseAction.position.y;
    }

    // mouse pressed
    if(im.mouseAction.isPressed() && im.insideCanvas(im.mouseAction.startPosition) && !mp){
      if(state.mode === 'move' && !selectedShape){
        selectedShape = _.last(_.where(state.entities, function(obj){
          return self.entities[obj.id].pointInShape({
            x: im.mouseAction.startPosition.x / self.box.scale,
            y: im.mouseAction.startPosition.y / self.box.scale
          });
        }));
        console.log(selectedShape);
        if(selectedShape){
          selectedEntity = this.entities[selectedShape.id];
        }
      }
      if(state.mode === 'move' && selectedShape){
        selectedShape.x = im.mouseAction.position.x;
        selectedShape.y = im.mouseAction.position.y;
        if(selectedShape.staticBody){
          selectedEntity.x = selectedShape.x / this.box.scale;
          selectedEntity.y = selectedShape.y / this.box.scale;
          this.box.removeBody(selectedEntity.id);
          this.box.addBody(selectedEntity);
        } else {
          this.box.setPosition(selectedEntity.id, selectedShape.x / this.box.scale, selectedShape.y / this.box.scale);
          this.box.setLinearVelocity(selectedEntity.id, 0, 0);
          this.box.setAngularVelocity(selectedEntity.id, 0);
        }
        displayJSON();
      } else if(state.mode === 'create'){
        mp = im.mouseAction.startPosition;
        console.log('start ' + state.tool, mp);
        state.geometries.push(mp);
      }
    }

    //mouse released
    if(!im.mouseAction.isPressed() && im.mouseAction.endPosition){
      if(state.mode === 'move' && selectedEntity){
        this.box.removeBody(selectedEntity.id);
        this.box.addBody(selectedEntity);
        displayJSON();
      } else if(mp){
        mp = im.mouseAction.endPosition;

        if(state.tool === 'polygon' && state.geometries.length !== MAX_POLY_SIDES && (state.geometries.length <= 1 || utils.distance(state.geometries[0], mp) > POINT_RADIUS)){
          mp = null;
          return;
        }

        state.geometries.push(mp);
        state.entities.push(createJSON[state.tool](state.geometries));
        this.createBodies();
        state.geometries = [];

        mp = null;
      }

      im.mouseAction.endPosition = null;

      if(selectedEntity){
        selectedShape = selectedEntity = null;
      }
    }
  };

});