'use strict';

const assert = require('assert');
const readline = require('readline');
const { start } = require('repl');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?
const movePiece = (startStack, endStack) => {
  // Your code here
  //* Remove a piece from startStack and checks if it is a legal move
  if(isLegal(startStack, endStack)) {
  let piece = stacks[startStack].pop();
  stacks[endStack].push(piece);
  }
}


// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (startStack, endStack) => {
  // Your code here

  // *Getting top ring from startStack and top ring from endStack
  const startRing = stacks[startStack].slice(-1)[0];
  const endRing = stacks[endStack].slice(-1)[0];
  // console.log(startRing, endRing);
  
  // * if startStack is empty or if ring on endStack is larger than ring on startStack
  if (stacks[endStack].length === 0) {
      // console.log(startRing)
    return true;
  } else if (startRing < endRing) {
    return true; 
  } else {
    return false;
  }
}

// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {
  // Your code here
  
  // *Checks for win if b or c has 4 rings, if not then returns false
  if (stacks.b.length === 4 || stacks.c.length === 4) {
    console.log('You win!');
    return true; 
  } else {
    return false; 
  }
}



// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  // Your code here
  movePiece(startStack, endStack)
}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      const startRing = stacks[startStack].slice(-1)[0];
      const endRing = stacks[endStack].slice(-1)[0];
      console.log(`**********`, startRing, endRing)
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
