define([
  'lodash',
  'frozen/utils'
], function(_, utils){

  var POINT_RADIUS = 4;

  return function(ctx, im, geometries){
    //draw poly points
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    _.forEach(geometries, function(geometry){
      ctx.beginPath();
      ctx.arc(geometry.x, geometry.y, POINT_RADIUS, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    });

    if((geometries.length > 1) && im.mouseAction.position && (utils.distance(geometries[0], im.mouseAction.position) <= POINT_RADIUS)){
      ctx.strokeStyle = 'yellow';
      ctx.fillStyle = 'black';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(geometries[0].x, geometries[0].y, POINT_RADIUS, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.lineWidth = 1;
    }

    ctx.strokeStyle = "red";
    ctx.beginPath();

    _.forEach(geometries, function(geometry, idx){
      if(idx > 0){
        ctx.moveTo(geometries[idx - 1].x, geometries[idx - 1].y);
        ctx.lineTo(geometry.x, geometry.y);
      }
    });

    if(im.mouseAction.position){
      ctx.moveTo(geometries[geometries.length - 1].x, geometries[geometries.length - 1].y );
      ctx.lineTo(im.mouseAction.position.x, im.mouseAction.position.y);
    }

    ctx.stroke();
    ctx.closePath();
  };

});