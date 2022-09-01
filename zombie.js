//input
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

//set variables
let infected_creatures = [];
let final_position = [];
let creature = JSON.parse(JSON.stringify(a.creatures));
let zombie_index = 0;

//detect zombie movement
function process(x, y) {
  for (i = 0; i < a.commands.length; i++) {
    if (a.commands[i] === "L") {
      if (x - 1 < 0) {
        x = a.gridSize - 1;
      } else {
        x = x - 1;
      }
    } else if (a.commands[i] === "R") {
      if (x + 1 > a.gridSize - 1) {
        x = 0;
      } else {
        x = x + 1;
      }
    } else if (a.commands[i] === "U") {
      if (y - 1 < 0) {
        y = a.gridSize - 1;
      } else {
        y = y - 1;
      }
    } else if (a.commands[i] === "D") {
      if (y + 1 > a.gridSize - 1) {
        y = 0;
      } else {
        y = y + 1;
      }
    }；
    console.log("zombie " + zombie_index + " moved to (" + x + "," + y + ").");
    infect_creature(x, y);
  }；
  final_position.push({ x, y });
}；

//zombies infect creatures
function infect_creature(infected_x, infected_y) {
  for (j = 0; j < creature.length; j++) {
    if (infected_x === creature[j].x && infected_y === creature[j].y) {
      infected_creatures.push({ infected_x, infected_y });
      creature.splice(j, 1);
      console.log(
        "zombie " +
          zombie_index +
          " infected creature at (" +
          infected_x +
          "," +
          infected_y +
          ")."
      )
    }
  }
}

//call zombie 0 movement
process(a.zombie.x, a.zombie.y);

//new zombies process (if there is any)
for (k = 0; k < infected_creatures.length; k++) {
  zombie_index++;
  process(infected_creatures[k].infected_x, infected_creatures[k].infected_y);
}

//output
let Output = {
  zombies: final_position,
  creatures: creature,
};

console.log(Output);
