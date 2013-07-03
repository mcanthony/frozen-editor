define([
  './state',
  './ui/toggleRedo',
  './ui/loadJSON',
  './ui/saveJSON',
  './ui/displayJSON',
  'put',
  'lodash',
  'dojo/on',
  'dojo/query'
], function(state, toggleRedo, loadJSON, saveJSON, displayJSON, put, _, on, query){

  'use strict';

  return function(im){
    var self = this;

    on(document, '#createForm:change', function(e){
      state.geometries = [];

      if(e.target.name === 'mode'){
        state.mode = e.target.value;
        console.log('mode', state.mode);
        var toolEls = document.querySelectorAll('.tools');
        _.forEach(toolEls, function(toolEl){
          if(toolEl.id === state.mode){
            put(toolEl, '!hide');
          } else {
            put(toolEl, '.hide');
          }
        });
      }

      if(e.target.name === 'create'){
        state.tool = e.target.value;
        console.log('create', state.tool);
      }

      if(e.target.name === 'createOption'){
        state.options = e.target.value;
        console.log('createOption', state.options);
      }
    });

    on(document, '#load:click', function(){
      var result = loadJSON();
      if(result){
        self.setHeight(state.height);
        self.setWidth(state.width);
        self.createBodies();
      }
    });

    on(document, '#save:click', function(e){
      saveJSON();
    });

    on(document, '#prettyPrint:change', function(e){
      var result = loadJSON();
      if(result){
        displayJSON();
      }
    });

    on(document, '#undoBtn:click', function(e){
      if(state.entities.length){
        state.undoObjs.push(state.entities.pop());
        self.createBodies();
      }
      toggleRedo();
    });

    on(document, '#redoBtn:click', function(e){
      if(state.undoObjs.length){
        state.entities.push(state.undoObjs.pop());
        self.createBodies();
      }
      toggleRedo();
    });

    on(document, '.gravity:change', _.debounce(_.bind(self.createBodies, self), 500));

    on(document, '#sensor:change', function(e){
      state.sensor = e.target.checked;
    });

    on(document, '#runSimulation:change', function(e){
      self.boxUpdating = e.target.checked;
    });

    on(document, '#showStatic:change', function(e){
      state.showStatic = e.target.checked;
    });

    on(document, 'selectstart', function(e){
      e.preventDefault();
    });
  };

});