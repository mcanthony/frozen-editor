define([
  './box',
  './StateManager',
  'dojo/dom'
], function(box, StateManager, dom){

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
    game: null,
    codeMirror: CodeMirror.fromTextArea(dom.byId('output'), {
      theme: 'frozen',
      matchBrackets: true,
      lineWrapping: true,
      mode: 'application/json'
    })
  });

  return state;

});