define([
  '../state',
  'put',
  'dojo/request'
], function(state, put, request){

  'use strict';

  return function(){
    var msgEl = document.getElementById('msg');
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
      console.log('could not generate gist data', err);
    }
    request.post('https://api.github.com/gists', {
      data: data
    }).then(function(resp){
      var data = JSON.parse(resp);
      console.log('gist created', data);

      // TODO: Don't inline html
      put(msgEl, '!error', {
        innerHTML: 'Data Saved: <a href="' + data.html_url + '">' + data.html_url + '</a>'
      });
    }, function(err){
      put(msgEl, '.error', {
        textContent: 'Error Saving Data - Please Try Again'
      });
    });
  };

});