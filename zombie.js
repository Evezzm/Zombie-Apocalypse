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
let infected_creatures_queue = [];
let final_position = [];
let creature = JSON.parse(JSON.stringify(a.creatures));
let zombie_index = 0;

//define function for zombie moving out of grid
function correction(x, y) {
  if (x < 0) {
    x = a.gridSize - 1;
  } else if (x > a.gridSize - 1) {
    x = 0;
  } else if (y < 0) {
    y = a.gridSize - 1;
  } else if (y > a.gridSize - 1) {
    y = 0;
  }
  return { new_x: x, new_y: y };
}

//define function for zombie movement
function move(x, y, x_delta, y_delta) {
  x = x + x_delta;
  y = y + y_delta;
  const ret = correction(x, y);
  return { new_x: ret.new_x, new_y: ret.new_y };
}

//create command table
const movement_table = {
  L: { delta_x: -1, delta_y: 0 },
  R: { delta_x: 1, delta_y: 0 },
  U: { delta_x: 0, delta_y: -1 },
  D: { delta_x: 0, delta_y: 1 },
};

//define function to log zombie movement
function process(x, y) {
  for (i = 0; i < a.commands.length; i++) {
    operation = movement_table[a.commands[i]];

    const ret = move(x, y, operation.delta_x, operation.delta_y);
    x = ret.new_x;
    y = ret.new_y;

    console.log("zombie " + zombie_index + " moved to (" + x + "," + y + ").");
    infect_creature(x, y);
  }
  final_position.push({ x, y });
}

//zombies infect creatures
function infect_creature(infected_x, infected_y) {
  for (j = 0; j < creature.length; j++) {
    if (infected_x === creature[j].x && infected_y === creature[j].y) {
      infected_creatures_queue.push({ infected_x, infected_y });
      creature.splice(j, 1);
      console.log(
        "zombie " +
          zombie_index +
          " infected creature at (" +
          infected_x +
          "," +
          infected_y +
          ")."
      );
    }
  }
}

//call zombie 0 movement
process(a.zombie.x, a.zombie.y);

//new zombies process (if there is any)
while (infected_creatures_queue.length > 0) {
  zombie_index++;
  earliest_infected = infected_creatures_queue.shift();
  process(earliest_infected.infected_x, earliest_infected.infected_y);
}

//output
let output = {
  zombies: final_position,
  creatures: creature,
};

console.log(output);
