define([
  'dojo/dom',
  'dojo/domReady!'
], function(dom){

  'use strict';

  var state = {
    entities: [],
    joints: [],
    undoObjs: [],
    geometries: [],
    tool: 'rectangle',
    toolType: 'static',
    sensor: false,
    showStatic: true,
    backImg: null,
    game: null,
    codeMirror: CodeMirror.fromTextArea(dom.byId('output'), {
      theme: 'frozen',
      matchBrackets: true,
      lineWrapping: true,
      mode: 'application/json'
    })
  };

  return state;

});