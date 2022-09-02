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

//set movement functions
function left(x, y) {
  if (x - 1 < 0) {
    x = a.gridSize - 1;
  } else {
    x = x - 1;
  }

  return { new_x: x, new_y: y };
}

function right(x, y) {
  if (x + 1 > a.gridSize - 1) {
    x = 0;
  } else {
    x = x + 1;
  }

  return { new_x: x, new_y: y };
}

function up(x, y) {
  if (y - 1 < 0) {
    y = a.gridSize - 1;
  } else {
    y = y - 1;
  }

  return { new_x: x, new_y: y };
}

function down(x, y) {
  if (y + 1 > a.gridSize - 1) {
    y = 0;
  } else {
    y = y + 1;
  }

  return { new_x: x, new_y: y };
}

//set movement table
const movement_table = {
  L: left,
  R: right,
  U: up,
  D: down,
};

//detect zombie movement
function process(x, y) {
  for (i = 0; i < a.commands.length; i++) {
    operation = movement_table[a.commands[i]];
    const ret = operation(x, y);
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
