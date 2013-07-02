define([
  '../state',
  'put'
], function(state, put){

  'use strict';

  return function(){
    var msgEl = document.getElementById('msg');

    try {
      var data = JSON.parse(state.codeMirror.getValue());
      state.entities = data.entities || data.objs;
      if(data.joints){
        state.joints = data.joints;
      }
      if(data.backImg){
        state.backImg = new Image();
        state.backImg.src = data.backImg;
      }
      if(data.canvas.height){
        state.height = data.canvas.height;
      }
      if(data.canvas.width){
        state.width = data.canvas.width;
      }

      console.log(data);
      put(msgEl, '!error', {
        textContent: ''
      });

      return state;
    } catch(err){
      console.info('error loading json', err);
      put(msgEl, '.error', {
        textContent: 'Error loading JSON - ' + err.message
      });
    }
  };

});