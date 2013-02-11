define([
  '../state',
  'dojo/dom'
], function(state, dom){

  return function(entities){

    state.codeMirror.setValue(JSON.stringify({
      entities: entities,
      joints: state.joints,
      canvas: {
        height: state.game ? state.game.height : null,
        width: state.game ? state.game.width : null
      },
      backImg: state.backImg ? state.backImg.src : null
    }, null, '  '));

  };

});