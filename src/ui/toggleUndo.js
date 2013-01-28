define([
  '../state',
  'dojo/dom'
], function(state, dom){

  var undoBtn = dom.byId('undoBtn');

  return function(){
    if(state.jsonObjs.length){
      undoBtn.disabled = false;
    } else {
      undoBtn.disabled = true;
    }
  };

});