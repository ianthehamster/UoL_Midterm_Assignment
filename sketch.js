/*

Game Project 4 - Side Scrolling

Mid Term Assignment

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;

var isLeft;
var isRight;
var isFallingDueToGravity;
var isFallingDownCanyon;
var isJumping;
var ignoreSpacebar;

var collectable;
var canyon;

var trees_x;
var treePos_y;

var clouds_x;
var clouds_y;

var mountains_x;
var mountains_y;
var mountains_height;
var temp_collectable;

// var scrollPos;
var gameChar_world_x;

var cameraPosX;

var enemy;

var game_score;
var flagpole;
var lives;
var playerLostLife;

function drawCanyon(t_canyon) {
  fill(100, 50, 0);
  rect(t_canyon.x_pos, 432, t_canyon.width, 144);
}

function apple1(t_collectable) {
  if (
    dist(gameChar_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < 20
  ) {
    collectable.isFound = true;
  }
  // Main apple body
  if (!t_collectable.isFound) {
    fill(255, 0, 0);
    noStroke();
    ellipse(
      t_collectable.x_pos,
      t_collectable.y_pos - 15,
      t_collectable.size,
      t_collectable.size,
    );

    fill(255, 0, 0);
    arc(
      t_collectable.x_pos + 6,
      t_collectable.y_pos - 27,
      t_collectable.size - 20,
      t_collectable.size - 20,
      PI,
      TWO_PI,
    );
    arc(
      t_collectable.x_pos - 6,
      t_collectable.y_pos - 27,
      t_collectable.size - 20,
      t_collectable.size - 20,
      PI,
      TWO_PI,
    );

    stroke(101, 67, 33);
    strokeWeight(2);
    line(
      t_collectable.x_pos,
      t_collectable.y_pos - 40,
      t_collectable.x_pos,
      t_collectable.y_pos - 39,
    );

    fill(34, 139, 34);
    noStroke();
    ellipse(
      t_collectable.x_pos + 6,
      t_collectable.y_pos - 32,
      t_collectable.size - 15,
      t_collectable.size - 20,
    );
  }
}

function drawCloud() {
  for (let i = 0; i < clouds_x.length; i++) {
    fill(255, 255, 255);
    ellipse(clouds_x[i] + 200, clouds_y[i] + 150, 80, 80);
    ellipse(clouds_x[i] + 160, clouds_y[i] + 150, 60, 60);
    ellipse(clouds_x[i] + 240, clouds_y[i] + 150, 60, 60);
  }
  // fill(255, 255, 255);
  // ellipse(x_pos + 200, y_pos + 150, 80, 80);
  // ellipse(x_pos + 160, y_pos + 150, 60, 60);
  // ellipse(x_pos + 240, y_pos + 150, 60, 60);
}

function drawMountain(x_pos, y_pos, height) {
  fill(179, 189, 199);
  noStroke();
  triangle(x_pos, y_pos, x_pos + 100, height, x_pos + 200, y_pos);
  fill(255, 255, 255);
  triangle(
    x_pos + 70,
    y_pos - 250,
    x_pos + 100,
    height,
    x_pos + 200 - 70,
    y_pos - 250,
  );
}

function drawEnemy() {
  fill(255, 102, 255);
  ellipse(enemy.x_pos, enemy.y_pos, enemy.size, enemy.size);
}

function updateEnemy() {
  enemy.x_pos += enemy.speed * enemy.direction;

  if (enemy.x_pos > 600 + enemy.range || enemy.x_pos < 400 + enemy.range) {
    enemy.direction *= -1;
  }
}

function checkCollectable(temp_collectable) {
  if (
    dist(
      gameChar_x,
      gameChar_y,
      temp_collectable.x_pos,
      temp_collectable.y_pos,
    ) < 20
  ) {
    temp_collectable.isFound = true;
    console.log('You have found a collectable', temp_collectable);
    game_score += 1;
  }
}

function checkCanyon(canyon) {
  if (
    gameChar_x > canyon.x_pos + 20 &&
    gameChar_x < canyon.x_pos + canyon.width &&
    gameChar_y >= 432
  ) {
    isFallingDownCanyon = true;
    console.log('Game Character should fall');
    console.log(
      canyon.x_pos + 20,
      canyon.x_pos + canyon.width,
      gameChar_x,
      gameChar_y,
      isFallingDownCanyon,
    );
  }
}

function renderFlagpole() {
  // push and pop ensures stroke and fill do not affect other elements
  push();
  stroke(0);
  strokeWeight(5);
  line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
  fill(0, 255, 0);

  if (flagpole.isReached) {
    noStroke();
    rect(flagpole.x_pos, floorPos_y - 250, 100, 50);
    fill(0);
    text('You made it!', flagpole.x_pos + 20, floorPos_y - 220);
  } else {
    rect(flagpole.x_pos, floorPos_y - 50, 100, 50);
  }
  pop();
}

function checkFlagpole() {
  // if (dist(gameChar_world_x, gameChar_y, flagpole.x_pos, floorPos_y) < 50) {
  //   flagpole.isReached = true;
  // }
  var d = abs(gameChar_world_x - flagpole.x_pos);

  if (d < 15) {
    flagpole.isReached = true;
  }
  console.log('Distance to flagpole', d);
}

function checkPlayerDie() {
  // if (gameChar_y >= height) {
  //   lives -= 1;
  //   if (lives >= 0) {
  //     startGame();
  //   }
  // }
  if (gameChar_y >= 576 && !playerLostLife) {
    playerLostLife = true;
    lives -= 1;
  }

  if (lives > 0 && playerLostLife) {
    startGame();
  }
}

function startGame() {
  gameChar_x = width / 2;
  gameChar_y = floorPos_y;

  isLeft = false;
  isRight = false;
  isFallingDueToGravity = false;
  isFallingDownCanyon = false;
  isJumping = false;
  isPlayerDead = false;

  collectable = {
    x_pos: 339,
    y_pos: 432,
    size: 30,
    isFound: false,
  };

  temp_collectable = [
    {
      x_pos: 400,
      y_pos: 432,
      size: 30,
      isFound: false,
    },
    {
      x_pos: 600,
      y_pos: 432,
      size: 30,
      isFound: false,
    },
    {
      x_pos: -100,
      y_pos: 432,
      size: 30,
      isFound: false,
    },
    {
      x_pos: 800,
      y_pos: 432,
      size: 30,
      isFound: false,
    },
    {
      x_pos: 890,
      y_pos: 432,
      size: 30,
      isFound: false,
    },
  ];

  canyon = [
    {
      x_pos: 20,
      width: 100,
    },
    {
      x_pos: 1020,
      width: 120,
    },
    {
      x_pos: 1520,
      width: 100,
    },
    {
      x_pos: 2100,
      width: 100,
    },
  ];

  ignoreSpacebar = false;

  trees_x = [
    -1000, -800, -570, -380, -50, 300, 500, 900, 1200, 1450, 1780, 1990, 2200,
    2700, 2900, 3200, 3600,
  ];
  treePos_y = floorPos_y;

  clouds_x = [
    -100, 300, 500, 600, 900, 1100, 1400, 1500, 1600, 1800, 1998, 2300,
  ];
  clouds_y = [-60, -80, -50, -70, -90, -70, -100, -90, -70, -100, -50, -80];

  mountains_x = [300, 500, 800, 900, 1200, 1300, 1400];
  mountains_y = 432;
  mountains_height = [70, 80, 70, 90, 70, 60, 95];

  // scrollPos = 0;
  gameChar_world_x = gameChar_x;

  cameraPosX = 0;

  enemy = {
    x_pos: 600,
    y_pos: floorPos_y - 20,
    size: 30,
    speed: 2,
    range: 200,
    direction: 1,
  };

  game_score = 0;

  flagpole = {
    isReached: false,
    x_pos: 2300,
  };
  playerLostLife = false;
}

function setup() {
  createCanvas(1024, 576);
  floorPos_y = (height * 3) / 4;
  startGame();
  // gameChar_x = width / 2;
  // gameChar_y = floorPos_y;

  // isLeft = false;
  // isRight = false;
  // isFallingDueToGravity = false;
  // isFallingDownCanyon = false;
  // isJumping = false;
  // isPlayerDead = false;

  // collectable = {
  //   x_pos: 339,
  //   y_pos: 432,
  //   size: 30,
  //   isFound: false,
  // };

  // temp_collectable = [
  //   {
  //     x_pos: 400,
  //     y_pos: 432,
  //     size: 30,
  //     isFound: false,
  //   },
  //   {
  //     x_pos: 600,
  //     y_pos: 432,
  //     size: 30,
  //     isFound: false,
  //   },
  //   {
  //     x_pos: -100,
  //     y_pos: 432,
  //     size: 30,
  //     isFound: false,
  //   },
  //   {
  //     x_pos: 800,
  //     y_pos: 432,
  //     size: 30,
  //     isFound: false,
  //   },
  //   {
  //     x_pos: 890,
  //     y_pos: 432,
  //     size: 30,
  //     isFound: false,
  //   },
  // ];

  // canyon = [
  //   {
  //     x_pos: 20,
  //     width: 100,
  //   },
  //   {
  //     x_pos: 1020,
  //     width: 120,
  //   },
  //   {
  //     x_pos: 1520,
  //     width: 100,
  //   },
  //   {
  //     x_pos: 2100,
  //     width: 100,
  //   },
  // ];

  // ignoreSpacebar = false;

  // trees_x = [
  //   -1000, -800, -570, -380, -50, 300, 500, 900, 1200, 1450, 1780, 1990, 2200,
  //   2700, 2900, 3200, 3600,
  // ];
  // treePos_y = floorPos_y;

  // clouds_x = [
  //   -100, 300, 500, 600, 900, 1100, 1400, 1500, 1600, 1800, 1998, 2300,
  // ];
  // clouds_y = [-60, -80, -50, -70, -90, -70, -100, -90, -70, -100, -50, -80];

  // mountains_x = [300, 500, 800, 900, 1200, 1300, 1400];
  // mountains_y = 432;
  // mountains_height = [70, 80, 70, 90, 70, 60, 95];

  // // scrollPos = 0;
  // gameChar_world_x = gameChar_x;

  // cameraPosX = 0;

  // enemy = {
  //   x_pos: 600,
  //   y_pos: floorPos_y - 20,
  //   size: 30,
  //   speed: 2,
  //   range: 200,
  //   direction: 1,
  // };

  // game_score = 0;

  // flagpole = {
  //   isReached: false,
  //   x_pos: 2300,
  // };

  lives = 3;
  // playerLostLife = false;
}

function draw() {
  ///////////DRAWING CODE//////////

  cameraPosX = gameChar_x - 600;
  gameChar_world_x = gameChar_x;

  background(100, 155, 255); //fill the sky blue
  if (!isFallingDownCanyon) gameChar_y = Math.min(432, gameChar_y);

  noStroke();
  fill(0, 155, 0);
  rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground

  fill(255);
  noStroke();
  text('score: ' + game_score, 30, 20);
  text('lives: ' + lives, 30, 40);

  push();

  translate(-cameraPosX, 0);

  drawCloud();
  // for (let i = 0; i < clouds_x.length; i++) {
  //   let cloudScreenX = clouds_x[i];
  //   drawCloud(cloudScreenX, clouds_y[i]);
  // }

  for (let i = 0; i < mountains_x.length; i++) {
    let mountainScreenX = mountains_x[i];
    drawMountain(mountainScreenX, mountains_y, mountains_height[i]);
  }

  for (let i = 0; i < trees_x.length; i++) {
    let treeScreenX = trees_x[i];

    fill(100, 50, 0);
    rect(treeScreenX - 25, -150 + treePos_y, 50, 150);
    fill(0, 100, 0);
    triangle(
      treeScreenX - 75,
      treePos_y - 150,
      treeScreenX,
      treePos_y - 300,
      treeScreenX + 75,
      treePos_y - 150,
    );
    triangle(
      treeScreenX - 100,
      treePos_y - 75,
      treeScreenX,
      treePos_y - 225,
      treeScreenX + 100,
      treePos_y - 75,
    );
  }

  // draw collectable

  for (let i = 0; i < temp_collectable.length; i++) {
    if (!temp_collectable[i].isFound) {
      apple1(temp_collectable[i]);
      checkCollectable(temp_collectable[i]);
    }
  }

  // Draw the enemy
  drawEnemy();
  updateEnemy();

  if (dist(gameChar_x, gameChar_y, enemy.x_pos, enemy.y_pos) < 40) {
    console.log('Dead');
    isPlayerDead = true;
    gameChar_x = width / 2;
    gameChar_y = floorPos_y;
  }

  // Draw the canyon

  for (let i = 0; i < canyon.length; i++) {
    drawCanyon(canyon[i]);
  }

  renderFlagpole();

  //the game character
  if (isLeft && isJumping) {
    // add your jumping-left code
    fill(200, 150, 150);

    ellipse(gameChar_x, gameChar_y - 57, 35);

    fill(100, 150, 0);

    rect(gameChar_x - 13, gameChar_y - 42, 26, 30);

    fill(0);

    rect(gameChar_x - 20, gameChar_y - 13, 15, 10);

    rect(gameChar_x + 5, gameChar_y - 13, 10, 15);
    // Draw the arms
    stroke(200, 150, 150);
    strokeWeight(5);
    line(gameChar_x - 13, gameChar_y - 35, gameChar_x - 30, gameChar_y - 30);
    line(gameChar_x + 13, gameChar_y - 35, gameChar_x - 4, gameChar_y - 30);
    strokeWeight(1);
    // Draw the arms
    stroke(200, 150, 150);
    strokeWeight(5);
    line(gameChar_x - 13, gameChar_y - 35, gameChar_x - 30, gameChar_y - 30);
    line(gameChar_x + 13, gameChar_y - 35, gameChar_x - 4, gameChar_y - 30);
    strokeWeight(1);
  } else if (isRight && isJumping) {
    // add your jumping-right code
    fill(200, 150, 150);

    ellipse(gameChar_x, gameChar_y - 57, 35);

    fill(100, 150, 0);

    rect(gameChar_x - 13, gameChar_y - 42, 26, 30);

    fill(0);

    rect(gameChar_x - 15, gameChar_y - 13, 10, 15);

    rect(gameChar_x + 5, gameChar_y - 13, 15, 10);

    // Draw the arms
    stroke(200, 150, 150);
    strokeWeight(5);
    line(gameChar_x - 13, gameChar_y - 35, gameChar_x + 4, gameChar_y - 30);
    line(gameChar_x + 13, gameChar_y - 35, gameChar_x + 30, gameChar_y - 30);
    strokeWeight(1);
  } else if (isLeft) {
    // add your walking left code

    fill(200, 150, 150);

    ellipse(gameChar_x, gameChar_y - 52, 35);

    fill(100, 150, 0);

    rect(gameChar_x - 13, gameChar_y - 37, 26, 30);

    fill(0);

    rect(gameChar_x - 20, gameChar_y - 8, 15, 10);

    rect(gameChar_x, gameChar_y - 8, 15, 10);

    // Draw the arms
    stroke(200, 150, 150);
    strokeWeight(5);
    line(gameChar_x - 13, gameChar_y - 35, gameChar_x - 30, gameChar_y - 30);
    line(gameChar_x + 13, gameChar_y - 35, gameChar_x - 4, gameChar_y - 30);
    strokeWeight(1);
  } else if (isRight) {
    // add your walking right code
    fill(200, 150, 150);

    ellipse(gameChar_x, gameChar_y - 52, 35);

    fill(100, 150, 0);

    rect(gameChar_x - 13, gameChar_y - 37, 26, 30);

    fill(0);

    rect(gameChar_x - 15, gameChar_y - 8, 15, 10);

    rect(gameChar_x + 5, gameChar_y - 8, 15, 10);

    // Draw the arms
    stroke(200, 150, 150);
    strokeWeight(5);
    line(gameChar_x - 13, gameChar_y - 35, gameChar_x + 4, gameChar_y - 30);
    line(gameChar_x + 13, gameChar_y - 35, gameChar_x + 30, gameChar_y - 30);
    strokeWeight(1);
  } else if (isJumping || isFallingDueToGravity) {
    // add your jumping facing forwards code
    fill(200, 150, 150);

    ellipse(gameChar_x, gameChar_y - 57, 35);

    fill(100, 150, 0);

    rect(gameChar_x - 13, gameChar_y - 42, 26, 30);

    fill(0);

    rect(gameChar_x - 15, gameChar_y - 13, 10, 15);

    rect(gameChar_x + 5, gameChar_y - 13, 10, 15);

    // Draw the arms
    stroke(200, 150, 150);
    strokeWeight(5);
    line(gameChar_x - 13, gameChar_y - 35, gameChar_x - 30, gameChar_y - 40);
    line(gameChar_x + 13, gameChar_y - 35, gameChar_x + 30, gameChar_y - 40);
    strokeWeight(1);
  } else {
    // add your standing front facing code
    // Draw the head
    fill(200, 150, 150);

    ellipse(gameChar_x, gameChar_y - 52, 35);

    // Draw the body
    fill(100, 150, 0);

    rect(gameChar_x - 13, gameChar_y - 37, 26, 30);

    // Draw the legs
    fill(0);

    rect(gameChar_x - 20, gameChar_y - 8, 15, 10);

    rect(gameChar_x + 5, gameChar_y - 8, 15, 10);

    // Draw the arms
    stroke(200, 150, 150);
    strokeWeight(5);
    line(gameChar_x - 13, gameChar_y - 35, gameChar_x - 30, gameChar_y - 30);
    line(gameChar_x + 13, gameChar_y - 35, gameChar_x + 30, gameChar_y - 30);
  }

  pop();

  // FALLING DOWN CANYON LOGIC

  for (let i = 0; i < canyon.length; i++) {
    checkCanyon(canyon[i]);
  }
  console.log(isFallingDownCanyon);

  ///////////INTERACTION CODE//////////
  //Put conditional statements to move the game character below here

  if (isFallingDownCanyon) {
    gameChar_y += 10; // Fall faster into the canyon
    if (gameChar_y >= height) {
      gameChar_y = height; // Stop falling once at the bottom

      ignoreSpacebar = false;

      if (isJumping && gameChar_y == 576) {
        gameChar_y -= 100;
        isJumping = false;

        if (gameChar_y >= 476) {
          gameChar_y += 10;
        }
      }
    }
  } else {
    if (isLeft) {
      gameChar_x -= 5;
    } else if (isRight) {
      gameChar_x += 5;
    } else if (isJumping && gameChar_y > 400) {
      gameChar_y -= 60;
    }

    if (ignoreSpacebar && gameChar_y <= 432) {
      isJumping = false;
      ignoreSpacebar = false;
    }

    if (isLeft && isJumping && gameChar_y > 400) {
      gameChar_y -= 60;
    } else if (!isJumping && gameChar_y < 432) {
      gameChar_y += 5;
    } else if (isRight && isJumping && gameChar_y > 400) {
      gameChar_y -= 60;
    } else if (!isJumping && gameChar_y < 432) {
      gameChar_y += 5;
    }
  }
  if (flagpole.isReached == false) {
    checkFlagpole();
  }

  // if (gameChar_y >= 576 && !playerLostLife) {
  //   playerLostLife = true;
  //   lives -= 1;
  // }
  checkPlayerDie();
}

function keyPressed() {
  if (keyCode == 37 && !isFallingDownCanyon) {
    isLeft = true;
  } else if (keyCode == 39 && !isFallingDownCanyon) {
    isRight = true;
  } else if (keyCode == 32) {
    if (!ignoreSpacebar) {
      isJumping = true;
      setTimeout(() => {
        ignoreSpacebar = true;
      }, 300);
    } else {
    }
  }

  if ((keyCode == 32 && isLeft) || (keyCode == 32 && isRight)) {
    isJumping = true;
  }
}

function keyReleased() {
  if (keyCode == 37) {
    isLeft = false;
  } else if (keyCode == 39) {
    isRight = false;
  }

  if (keyCode == 32) {
    isJumpings = false;
  }
}
