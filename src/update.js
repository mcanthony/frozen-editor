define([
  './state'
], function(state){

  return function(millis){
    if(state.runSimulation){
      state.box.update(millis);
      state.box.updateExternalState(state.entities);
    }
  };

});