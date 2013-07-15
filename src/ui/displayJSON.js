define([
  '../state',
  'dojo/dom'
], function(state, dom){

  'use strict';

  return function(){

    var whitespace = dom.byId('prettyPrint').checked ? '  ' : '';

    state.codeMirror.setValue(JSON.stringify({
      entities: state.entities,
      joints: state.joints,
      canvas: {
        height: state.game ? state.game.height : null,
        width: state.game ? state.game.width : null
      }
      // backImg: state.backImg ? state.backImg.src : null
    }, null, whitespace));

  };

});