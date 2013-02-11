define([
  './state',
  './createBodies',
  './createJSON/main',
  './utils/insideCanvas',
  'dojo/dom',
  'frozen/utils'
], function(state, createBodies, createJSON, insideCanvas, dom, utils){

  var MAX_POLY_SIDES = 10;
  var POINT_RADIUS = 4;

  var xdisp = dom.byId('xdisp');
  var ydisp = dom.byId('ydisp');

  var mp;

  return function(im){

    if(im.mouseAction.position){
      xdisp.innerHTML = im.mouseAction.position.x;
      ydisp.innerHTML = im.mouseAction.position.y;
    }

    // mouse pressed
    if(im.mouseAction.isPressed() && insideCanvas(im.mouseAction.startPosition, this) && !mp){
      mp = im.mouseAction.startPosition;
      console.log('start ' + state.tool, mp);
      state.geometries.push(mp);
    }

    //mouse released
    if(!im.mouseAction.isPressed() && im.mouseAction.endPosition && mp){
      mp = im.mouseAction.endPosition;

      if(state.tool === 'polygon' && state.geometries.length !== MAX_POLY_SIDES && (state.geometries.length <= 1 || utils.distance(state.geometries[0], mp) > POINT_RADIUS)){
        mp = null;
        return;
      }

      state.geometries.push(mp);
      state.entities.push(createJSON[state.tool](state.geometries));
      createBodies();
      state.geometries = [];

      im.mouseAction.endPosition = null;
      mp = null;
    }
  };

});