define([
  'frozen/utils'
], function(utils){

  return function(ctx, im, geometries){
    var dist = utils.distance(geometries[0], im.mouseAction.position);
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.arc(geometries[0].x, geometries[0].y, dist, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.stroke();
  };

});