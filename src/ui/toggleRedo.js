define([
  '../state',
  'dojo/dom'
], function(state, dom){

  'use strict';

  var redoBtn = dom.byId('redoBtn');

  return function(){
    if(state.undoObjs.length){
      redoBtn.disabled = false;
    } else {
      redoBtn.disabled = true;
    }
  };

});