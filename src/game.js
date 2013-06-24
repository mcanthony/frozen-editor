define([
  './state',
  './handleInput',
  './update',
  './draw',
  'frozen/box2d/Box',
  'frozen/box2d/BoxGame',
  'frozen/box2d/listeners/Contact',
  './ui/CanvasDND',
  './ui/events'
], function(state, handleInput, update, draw, Box, BoxGame, Contact, CanvasDND){

  'use strict';

  var box = new Box({
    contactListener: new Contact({
      beginContact: function(idA, idB, contact){
        console.log('begin contact', idA, idB, contact);
        if(contact.GetFixtureA().IsSensor() && contact.IsTouching()){
          state.game.entities[idB].touching[idA] = true;
        }
        if(contact.GetFixtureB().IsSensor() && contact.IsTouching()){
          state.game.entities[idA].touching[idB] = true;
        }
      },
      endContact: function(idA, idB, contact){
        console.log('end contact', idA, idB, contact);
        if(contact.GetFixtureA().IsSensor() && !contact.IsTouching()){
          state.game.entities[idB].touching[idA] = false;
        }
        if(contact.GetFixtureB().IsSensor() && !contact.IsTouching()){
          state.game.entities[idA].touching[idB] = false;
        }
      }
    })
  });

  //setup a BoxGame instance
  var game = new BoxGame({
    canvasId: 'canvas',
    handleInput: handleInput,
    update: update,
    draw: draw,
    box: box
  });

  state.game = game;

  var dnd = new CanvasDND();

  //if you want to take a look at the game object in dev tools
  console.log(game);

  //launch the game!
  game.run();

});