define([
  './draw/shape',
  './state',
  'lodash'
], function(drawShape, state, _){

  'use strict';

  return function(ctx){
    if(state.backImg){
      ctx.drawImage(state.backImg, 0, 0, this.canvas.width, state.backImg.height);
    } else {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    _.forEach(this.entities, function(entity){
      if(!entity.staticBody || state.showStatic){
        entity.draw(ctx);
      }
    });

    if(!state.geometries.length){
      return;
    }

    drawShape[state.create](ctx, this.inputManager, state.geometries);
  };

});