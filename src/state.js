define([
  './box',
  './StateManager'
], function(box, StateManager){

  var state = new StateManager({
    entities: {},
    jsonObjs: [],
    undoObjs: [],
    geometries: [],
    tool: 'rectangle',
    toolType: 'static',
    runSimulation: true,
    showStatic: true,
    box: box,
    backImg: null,
    game: null
  });

  return state;

});