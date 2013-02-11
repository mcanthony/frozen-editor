define([
  '../state',
  '../createBodies',
  './toggleRedo',
  'lodash',
  'dojo/on',
  'dojo/dom',
  'dojo/query',
  'dojo/request'
], function(state, createBodies, toggleRedo, _, on, dom, query, request){

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
      var data = JSON.parse(state.codeMirror.getValue());
      state.entities = data.entities || data.objs;
      if(data.joints){
        state.joints = data.joints;
      }
      if(data.backImg){
        state.backImg = new Image();
        state.backImg.src = data.backImg;
      }
      state.game.setHeight(data.canvas.height);
      state.game.setWidth(data.canvas.width);

      createBodies();

      console.log(data);
    } catch(err){
      console.info('error loading json', err);
    }
  });

  on(document, '#save:click', function(e){
    var savedGist = dom.byId('saved-gist');
    var data = '';
    try {
      data = JSON.stringify({
        'public': true,
        files: {
          "world.json": {
            content: state.codeMirror.getValue()
          }
        }
      });
    } catch(err){
      console.log(err);
    }
    request.post('https://api.github.com/gists', {
      method: 'POST',
      data: data
    }).then(function(resp){
      var data = JSON.parse(resp);
      console.log('gist created', data);

      // TODO: Don't inline html
      savedGist.innerHTML = 'Data Saved: <a href="' + data.html_url + '">' + data.html_url + '</a>';
    }, function(err){
      savedGist.innerHTML = '<span class="error">Error Saving Data - Please Try Again</span>';
    });
  });

  on(document, '#undoBtn:click', function(e){
    if(state.entities.length){
      state.undoObjs.push(state.entities.pop());
      createBodies();
    }
    toggleRedo();
  });

  on(document, '#redoBtn:click', function(e){
    if(state.undoObjs.length){
      state.entities.push(state.undoObjs.pop());
      createBodies();
    }
    toggleRedo();
  });

  on(document, '.gravity:change', _.debounce(createBodies, 500));

  on(document, '#runSimulation:change', function(e){
    state.game.boxUpdating = e.target.checked;
  });

  on(document, '#showStatic:change', function(e){
    state.showStatic = e.target.checked;
  });

  on(document, 'selectstart', function(e){
    e.preventDefault();
  });

});