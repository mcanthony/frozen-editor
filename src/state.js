define([
  './StateManager',
  'dojo/dom',
  'dojo/domReady!'
], function(StateManager, dom){

  var state = new StateManager({
    entities: [],
    joints: [],
    undoObjs: [],
    geometries: [],
    tool: 'rectangle',
    toolType: 'static',
    showStatic: true,
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