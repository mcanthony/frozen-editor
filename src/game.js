define([
  './state',
  './handleInput',
  './draw',
  'frozen/box2d/BoxGame',
  './ui/CanvasDND',
  './ui/events'
], function(state, handleInput, draw, BoxGame, CanvasDND){

  //setup a BoxGame instance
  var game = new BoxGame({
    canvasId: 'canvas',
    handleInput: handleInput,
    draw: draw
  });

  state.game = game;

  var dnd = new CanvasDND();

  //if you want to take a look at the game object in dev tools
  console.log(game);

  //launch the game!
  game.run();

});