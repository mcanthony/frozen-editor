var dojoConfig = {
  baseUrl: './',
  packages: [
    { name: 'dojo', location: 'deps/dojo' },
    { name: 'dcl', location: 'deps/dcl', main: 'dcl' },
    { name: 'frozen', location: 'deps/frozen/src', main: 'GameCore' },
    { name: 'lodash', location: 'deps/lodash/dist', main: 'lodash' },
    { name: 'hammer', location: 'deps/hammer', main: 'hammer' },
    { name: 'game', location: 'src', main: 'game' }
  ],
  deps: ['game'],
  async: true
};