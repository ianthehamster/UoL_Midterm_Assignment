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

var scrollPos;
var gameChar_world_x;

var cameraPosX;

function apple(x_pos, y_pos, size) {
  // Main apple body
  fill(255, 0, 0);
  noStroke();
  ellipse(x_pos, y_pos - 15, size, size);

  fill(255, 0, 0);
  arc(x_pos + 6, y_pos - 27, size - 20, size - 20, PI, TWO_PI);
  arc(x_pos - 6, y_pos - 27, size - 20, size - 20, PI, TWO_PI);

  stroke(101, 67, 33);
  strokeWeight(2);
  line(x_pos, y_pos - 40, x_pos, y_pos - 39);

  fill(34, 139, 34);
  noStroke();
  ellipse(x_pos + 6, y_pos - 32, size - 15, size - 20);
}

function drawCloud(x_pos, y_pos, size) {
  fill(255, 255, 255);
  ellipse(x_pos + 200, y_pos + 150, 80, 80);
  ellipse(x_pos + 160, y_pos + 150, 60, 60);
  ellipse(x_pos + 240, y_pos + 150, 60, 60);
}

function drawMountainUpdated(x_pos, y_pos, height) {
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

function setup() {
  createCanvas(1024, 576);
  floorPos_y = (height * 3) / 4;
  gameChar_x = width / 2;
  gameChar_y = floorPos_y;

  isLeft = false;
  isRight = false;
  isFallingDueToGravity = false;
  isFallingDownCanyon = false;
  isJumping = false;

  collectable = {
    x_pos: 339,
    y_pos: 432,
    size: 30,
    isFound: false,
  };

  canyon = {
    x_pos: 20,
    width: 100,
  };

  ignoreSpacebar = false;

  trees_x = [300, 500, 900, 1200, 1450];
  treePos_y = floorPos_y;

  clouds_x = [-100, 300, 500, , 600, 900, 1100, 1300];
  clouds_y = [-60, -80, -50, -70, -90, -70, -100];

  mountains_x = [300, 500];
  mountains_y = 432;
  mountains_height = [70, 80];

  scrollPos = 0;
  gameChar_world_x = gameChar_x;

  cameraPosX = 0;
}

function draw() {
  ///////////DRAWING CODE//////////

  background(100, 155, 255); //fill the sky blue
  if (!isFallingDownCanyon) gameChar_y = Math.min(432, gameChar_y);

  noStroke();
  fill(0, 155, 0);
  rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground
  // console.log(scrollPos);
  push();

  translate(cameraPosX, 0);

  for (let i = 0; i < clouds_x.length; i++) {
    let cloudScreenX = clouds_x[i] + scrollPos;

    drawCloud(cloudScreenX, clouds_y[i]);
  }

  // drawMountainUpdated(500, 432, 70);
  // drawMountainUpdated(300, 432, 80);

  for (let i = 0; i < mountains_x.length; i++) {
    let mountainScreenX = mountains_x[i] + scrollPos;
    drawMountainUpdated(mountainScreenX, mountains_y, mountains_height[i]);
  }

  for (let i = 0; i < trees_x.length; i++) {
    let treeScreenX = trees_x[i] + scrollPos; // Adjust position relative to scroll
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
  let collectableScreenX = collectable.x_pos + scrollPos;

  if (dist(gameChar_x, gameChar_y, collectable.x_pos, collectable.y_pos) < 20) {
    collectable.isFound = true;
  }
  if (!collectable.isFound) {
    // apple(collectable.x_pos - 36, collectable.y_pos, collectable.size);
    apple(collectableScreenX, collectable.y_pos, collectable.size);

    // apple(collectable.x_pos + 100, collectable.y_pos, collectable.size);
    // apple(canyon.x_pos - 310, collectable.y_pos, collectable.size);
  }

  // Draw the canyon
  let canyonScreenX = canyon.x_pos + scrollPos;
  fill(100, 50, 0);
  rect(canyonScreenX, 432, canyon.width, 144);

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

  if (
    gameChar_world_x > canyon.x_pos + 50 &&
    gameChar_world_x < canyon.x_pos + canyon.width
  ) {
    isFallingDownCanyon = true;
  } else {
    isFallingDownCanyon = false;
  }

  ///////////INTERACTION CODE//////////
  //Put conditional statements to move the game character below here
  // if (gameChar_y < 582 && gameChar_y > 442) {
  //   ignoreSpacebar = true;
  // } else if (gameChar_y == 582) {
  //   ignoreSpacebar = false;
  // }
  if (isFallingDownCanyon && gameChar_y >= 432) {
    gameChar_y += 10; // Fall faster into the canyon
    if (gameChar_y >= height) {
      gameChar_y = height; // Stop falling once at the bottom

      ignoreSpacebar = false;

      if (isJumping && gameChar_y == 576) {
        console.log(
          'Jumping at bottom of canyon',
          gameChar_y,
          'isFallingDownCanyon',
          isFallingDownCanyon,
        );
        gameChar_y -= 100;
        isJumping = false;

        if (gameChar_y >= 476) {
          console.log(
            'Jumping at bottom of canyon',
            gameChar_y,
            'isFallingDownCanyon',
            isFallingDownCanyon,
          );
          gameChar_y += 10;
        }
      }
    }
  } else {
    if (isLeft) {
      // gameChar_x -= 5;
      if (gameChar_x > width * 0.2) {
        gameChar_x -= 5; // Move character left on the screen
      } else {
        scrollPos += 5; // Scroll the world to the right
      }
      gameChar_world_x -= 5; // Update world position
    } else if (isRight) {
      // gameChar_x += 5;
      if (gameChar_x < width * 0.8) {
        gameChar_x += 5; // Move character right on the screen
      } else {
        scrollPos -= 5; // Scroll the world to the left
      }
      gameChar_world_x += 5; // Update world position
    } else if (isJumping && gameChar_y > 400) {
      gameChar_y -= 15;
    }

    if (ignoreSpacebar && gameChar_y <= 432) {
      isJumping = false;
      ignoreSpacebar = false;
    }

    if (isLeft && isJumping && gameChar_y > 400) {
      gameChar_y -= 20;
    } else if (!isJumping && gameChar_y < 432) {
      gameChar_y += 15;
    } else if (isRight && isJumping && gameChar_y > 400) {
      gameChar_y -= 15;
    } else if (!isJumping && gameChar_y < 432) {
      gameChar_y += 15;
    }
  }
}

function keyPressed() {
  // if statements to control the animation of the character when
  // keys are pressed.

  //open up the console to see how these work

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
  // if statements to control the animation of the character when
  // keys are released.

  if (keyCode == 37) {
    isLeft = false;
  } else if (keyCode == 39) {
    isRight = false;
  }

  if (keyCode == 32) {
    isJumpings = false;
  }
}
