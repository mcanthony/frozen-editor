define([
  '../state',
  'dojo/dom'
], function(state, dom){

  // TODO: code mirror or ACE editor
  return function(json){

    dom.byId('output').value = JSON.stringify({
      objs: json,
      backImg: state.backImg.src
    }, null, '  ');

  };

});