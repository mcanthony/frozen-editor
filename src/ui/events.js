define([
  '../state',
  '../createBodies',
  './toggleRedo',
  'lodash',
  'dojo/on',
  'dojo/query',
  'dojo/domReady!'
], function(state, createBodies, toggleRedo, _, on, query){

  on(document, '#toolForm:change', function(e){
    state.geometries = [];

    if(e.target.name === 'tool'){
      state.tool = e.target.value;
      console.log('tool', state.tool);
    }

    if(e.target.name === 'toolType'){
      state.toolType = e.target.value;
      console.log('toolType', state.toolType);
    }
  });

  on(document, '#load:click', function(e){
    try {
      var jsobj = JSON.parse(state.codeMirror.getValue());
      state.jsonObjs = jsobj.objs;
      if(jsobj.backImg){
        state.backImg = new Image();
        state.backImg.src = jsobj.backImg;
      }
      state.game.height = jsobj.canvas.height;
      state.game.canvas.height = jsobj.canvas.height;
      state.game.width = jsobj.canvas.width;
      state.game.canvas.width = jsobj.canvas.width;

      createBodies();

      console.log(jsobj);
    } catch(err){
      console.info('error loading json', err);
    }
  });

  on(document, '#undoBtn:click', function(e){
    if(state.jsonObjs.length){
      state.undoObjs.push(state.jsonObjs.pop());
      createBodies();
    }
    toggleRedo();
  });

  on(document, '#redoBtn:click', function(e){
    if(state.undoObjs.length){
      state.jsonObjs.push(state.undoObjs.pop());
      createBodies();
    }
    toggleRedo();
  });

  on(document, '.gravity:change', _.debounce(createBodies, 500));

  on(document, '#runSimulation:change', function(e){
    state.runSimulation = e.target.checked;
  });

  on(document, '#showStatic:change', function(e){
    state.showStatic = e.target.checked;
  });

  on(document, 'selectstart', function(e){
    e.preventDefault();
  });

});