function seed() {return [... arguments]}

function same([x, y], [j, k]) {return  x===j && y===k}

// The game state to search for `cell` is passed as the `this` value of the function.
function contains(cell) {
  for (const state_cell of this) {
    if(same(cell, state_cell)) 
     return true; 
   }
   return false;
}

const printCell = (cell, state) => {
  const does_contain = contains.call(state, cell);
  return (does_contain)? '\u25A3' : '\u25A2';
};

const corners = (state = []) => {
  if ( 0 === state.length){
    return {
      topRight: [0, 0],
      bottomLeft: [0, 0]
    }
  }

  const topRight=   [0, 0],
        bottomLeft= [state[0][0],state[0][1]];
  

  for (const cell of state) {
    topRight[0] = Math.max(topRight[0], cell[0]);
    topRight[1] = Math.max(topRight[1], cell[1]);

    bottomLeft[0] = Math.min(bottomLeft[0], cell[0]);
    bottomLeft[1] = Math.min(bottomLeft[1], cell[1]);
  }

  return {topRight, bottomLeft};
};

const printCells = (state) => {
  const {topRight, bottomLeft} = corners(state);
  let result = '';

  for (let y = topRight[1]; y >= bottomLeft[1]; y--) {
    for (let x = bottomLeft[0]; x <= topRight[0]; x++){
      result += printCell([x, y], state);
    }
    result += '\n'
  }

  return result;
};

const getNeighborsOf = ([x, y]) => {
  return [
    [x-1,y+1],[x,y+1],[x+1,y+1],
    [x-1,y],         [x+1,y],
    [x-1,y-1],[x,y-1],[x+1,y-1]
  ]
};

const getLivingNeighbors = (cell, state) => {
  const contains_binded = contains.bind(state);
  const neighbors = getNeighborsOf(cell);

  return neighbors.filter(neighbor => contains_binded(neighbor));
};

const willBeAlive = (cell, state) => {
  const livingNeighbors = getLivingNeighbors(cell, state);
  
  return (3 === livingNeighbors.length) || 
        ( 2 ===  livingNeighbors.length && contains.call(state, cell))
};

const calculateNext = (state) => {};

const iterate = (state, iterations) => {};

const main = (pattern, iterations) => {};

const startPatterns = {
    rpentomino: [
      [3, 2],
      [2, 3],
      [3, 3],
      [3, 4],
      [4, 4]
    ],
    glider: [
      [-2, -2],
      [-1, -2],
      [-2, -1],
      [-1, -1],
      [1, 1],
      [2, 1],
      [3, 1],
      [3, 2],
      [2, 3]
    ],
    square: [
      [1, 1],
      [2, 1],
      [1, 2],
      [2, 2]
    ]
  };
  
  const [pattern, iterations] = process.argv.slice(2);
  const runAsScript = require.main === module;
  
  if (runAsScript) {
    if (startPatterns[pattern] && !isNaN(parseInt(iterations))) {
      main(pattern, parseInt(iterations));
    } else {
      console.log("Usage: node js/gameoflife.js rpentomino 50");
    }
  }
  
  exports.seed = seed;
  exports.same = same;
  exports.contains = contains;
  exports.getNeighborsOf = getNeighborsOf;
  exports.getLivingNeighbors = getLivingNeighbors;
  exports.willBeAlive = willBeAlive;
  exports.corners = corners;
  exports.calculateNext = calculateNext;
  exports.printCell = printCell;
  exports.printCells = printCells;
  exports.startPatterns = startPatterns;
  exports.iterate = iterate;
  exports.main = main;