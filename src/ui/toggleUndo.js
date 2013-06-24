define([
  '../state',
  'dojo/dom'
], function(state, dom){

  'use strict';

  var undoBtn = dom.byId('undoBtn');

  return function(){
    if(state.entities.length){
      undoBtn.disabled = false;
    } else {
      undoBtn.disabled = true;
    }
  };

});