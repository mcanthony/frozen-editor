define([
  './state',
  './ui/toggleRedo',
  './ui/loadJSON',
  './ui/saveJSON',
  './ui/displayJSON',
  'lodash',
  'dojo/on',
  'dojo/query'
], function(state, toggleRedo, loadJSON, saveJSON, displayJSON, _, on, query){

  'use strict';

  return function(im){
    var self = this;

    on(document, '#createForm:change', function(e){
      state.geometries = [];

      if(e.target.name === 'tool'){
        state.tool = e.target.value;
        console.log('tool', state.tool);
      }

      if(e.target.name === 'create'){
        state.create = e.target.value;
        console.log('create', state.create);
      }

      if(e.target.name === 'createType'){
        state.createType = e.target.value;
        console.log('createType', state.createType);
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