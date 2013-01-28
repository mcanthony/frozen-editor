define([
  '../utils/orderRectPts'
], function(orderRectPts){

  return function(ctx, im, geometries){
    var pts = orderRectPts([geometries[0], im.mouseAction.position]);
    ctx.strokeStyle = 'red';

    ctx.strokeRect(pts[0].x, pts[0].y, pts[1].x - pts[0].x, pts[1].y - pts[0].y);
  };

});