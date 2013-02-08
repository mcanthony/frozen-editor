define([
  './draw/shape',
  './state',
  'lodash'
], function(drawShape, state, _){

  return function(ctx){
    if(state.backImg){
      ctx.drawImage(state.backImg, 0, 0, this.canvas.width, state.backImg.height);
    } else {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    _.forEach(state.entities, function(entity){
      if(!entity.staticBody || state.showStatic){
        entity.draw(ctx);
      }
    }, this);

    if(!state.geometries.length){
      return;
    }

    drawShape[state.tool](ctx, this.inputManager, state.geometries);
  };

});