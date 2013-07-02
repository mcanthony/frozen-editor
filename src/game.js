define([
  './state',
  './initInput',
  './handleInput',
  './update',
  './draw',
  './createBodies',
  'frozen/box2d/Box',
  'frozen/box2d/BoxGame',
  'frozen/box2d/listeners/Contact',
  './ui/CanvasDND'
], function(state, initInput, handleInput, update, draw, createBodies, Box, BoxGame, Contact, CanvasDND){

  'use strict';

  var box = new Box({
    contactListener: new Contact({
      beginContact: function(idA, idB, contact){
        console.log('begin contact', idA, idB, contact);
        if(contact.GetFixtureA().IsSensor() && contact.IsTouching()){
          game.entities[idB].touching[idA] = true;
        }
        if(contact.GetFixtureB().IsSensor() && contact.IsTouching()){
          game.entities[idA].touching[idB] = true;
        }
      },
      endContact: function(idA, idB, contact){
        console.log('end contact', idA, idB, contact);
        if(contact.GetFixtureA().IsSensor() && !contact.IsTouching()){
          game.entities[idB].touching[idA] = false;
        }
        if(contact.GetFixtureB().IsSensor() && !contact.IsTouching()){
          game.entities[idA].touching[idB] = false;
        }
      }
    })
  });

  //setup a BoxGame instance
  var game = new BoxGame({
    canvasId: 'canvas',
    initInput: initInput,
    handleInput: handleInput,
    update: update,
    draw: draw,
    box: box,
    createBodies: createBodies
  });

  state.game = game;

  var dnd = new CanvasDND({
    game: game
  });

  console.log(game);

  //launch the game!
  game.run();

});