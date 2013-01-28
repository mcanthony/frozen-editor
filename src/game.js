define([
  './state',
  './handleInput',
  './update',
  './draw',
  'frozen/GameCore',
  './ui/CanvasDND',
  './ui/events'
], function(state, handleInput, update, draw, GameCore, CanvasDND){

  //setup a GameCore instance
  var game = new GameCore({
    canvasId: 'canvas',
    handleInput: handleInput,
    update: update,
    draw: draw
  });

  state.game = game;

  var dnd = new CanvasDND();

  //if you want to take a look at the game object in dev tools
  console.log(game);

  //launch the game!
  game.run();

});