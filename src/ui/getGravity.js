define([
  'dojo/dom',
  'dojo/domReady!'
], function(dom){

  var gravityXField = dom.byId('gravityX');
  var gravityYField = dom.byId('gravityY');

  return function(){
    return {
      x: parseFloat(gravityXField.value, 10),
      y: parseFloat(gravityYField.value, 10)
    };
  };

});