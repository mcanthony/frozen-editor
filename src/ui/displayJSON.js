define([
  '../state',
  'dojo/dom'
], function(state, dom){

  return function(json){

    state.codeMirror.setValue(JSON.stringify({
      objs: json,
      canvas: {
        height: state.game ? state.game.height : null,
        width: state.game ? state.game.width : null
      },
      backImg: state.backImg ? state.backImg.src : null
    }, null, '  '));

  };

});