###### 1. How to run the file:
    Commanline: node zombie.js
    
###### 2. Input:
  	The input is specified in zombie.js.
    
    let a = {
      gridSize: 4,
      zombie: {
        x: 3,
        y: 1,
      },
      creatures: [
        {
          x: 0,
          y: 1,
        },
        {
          x: 1,
          y: 2,
        },
        {
          x: 1,
          y: 1,
        },
      ],
      commands: "RDRU",
    };
    
###### 3. Output:
    zombie 0 moved to (0,1).
    zombie 0 infected creature at (0,1).
    zombie 0 moved to (0,2).
    zombie 0 moved to (1,2).
    zombie 0 infected creature at (1,2).
    zombie 0 moved to (1,1).
    zombie 0 infected creature at (1,1).
    zombie 1 moved to (1,1).
    zombie 1 moved to (1,2).
    zombie 1 moved to (2,2).
    zombie 1 moved to (2,1).
    zombie 2 moved to (2,2).
    zombie 2 moved to (2,3).
    zombie 2 moved to (3,3).
    zombie 2 moved to (3,2).
    zombie 3 moved to (2,1).
    zombie 3 moved to (2,2).
    zombie 3 moved to (3,2).
    zombie 3 moved to (3,1).
    {
      zombies: [ { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 1 } ],
      creatures: []
    }
