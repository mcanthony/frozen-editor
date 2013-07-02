define([
  '../state',
  '../createBodies',
  './DNDFileController',
  'dcl'
], function(state, createBodies, DNDFileController, dcl){

  'use strict';

  return dcl([DNDFileController], {
    id: 'canvas',
    game: null,
    drop: function(e){
      var self = this;
      try {
        var files = e.dataTransfer.files;

        //only care about 1 image
        if(files && files.length === 1 && files[0].type.match(/image.*/)){
          var file = files[0];
          var reader = new FileReader();

          reader.onerror = function(evt) {
            console.log('Error code: ' + evt.target.error.code);
          };

          reader.onload = function(evt) {
            if (evt.target.readyState === FileReader.DONE) {
              console.log('base64 length',evt.target.result.length);

              var backImg = new Image();

              backImg.onload = function(){
                self.game.stop();

                state.backImg = backImg;

                self.game.setHeight(backImg.height);
                self.game.setWidth(backImg.width);

                self.game.createBodies();

                self.game.run();
              };

              backImg.src = evt.target.result;
            }
          };

          reader.readAsDataURL(file);

          console.log(file, reader);

          this.dragleave(e);
        }
      } catch(dropE){
        console.log('DnD error',dropE);
      }
    }
  });

});