/*

The Game Project

Week 3

Game interaction

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
}

function draw() {
  ///////////DRAWING CODE//////////

  background(100, 155, 255); //fill the sky blue
  if (!isFallingDownCanyon) gameChar_y = Math.min(432, gameChar_y);

  noStroke();
  fill(0, 155, 0);
  rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground

  //draw the canyon
  console.log(gameChar_x, gameChar_y, collectable.x_pos, collectable.y_pos);

  // draw collectable
  if (dist(gameChar_x, gameChar_y, collectable.x_pos, collectable.y_pos) < 20) {
    collectable.isFound = true;
  }
  if (!collectable.isFound) {
    // apple(collectable.x_pos - 36, collectable.y_pos, collectable.size);
    apple(collectable.x_pos, collectable.y_pos, collectable.size);

    // apple(collectable.x_pos + 100, collectable.y_pos, collectable.size);
    // apple(canyon.x_pos - 310, collectable.y_pos, collectable.size);
  }

  fill(150, 75, 0);
  rect(canyon.x_pos + 100, 432, canyon.width, 144);

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

  console.log('ignore spacebar is ', ignoreSpacebar);

  // FALLING DOWN CANYON LOGIC

  if (
    gameChar_x > canyon.x_pos + 100 &&
    gameChar_x < canyon.x_pos + 80 + canyon.width
  ) {
    isFallingDownCanyon = true;

    console.log('Character is falling down canyon');
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
      gameChar_x -= 5;
    } else if (isRight) {
      gameChar_x += 5;
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

  console.log('TEST', isFallingDownCanyon, gameChar_y);
}

function keyPressed() {
  // if statements to control the animation of the character when
  // keys are pressed.

  //open up the console to see how these work
  console.log('keyPressed: ' + key);
  console.log('keyPressed: ' + keyCode);

  if (keyCode == 37 && !isFallingDownCanyon) {
    isLeft = true;
    console.log('left arrow', isLeft);
  } else if (keyCode == 39 && !isFallingDownCanyon) {
    isRight = true;
    console.log('right arrow', isRight);
  } else if (keyCode == 32) {
    if (!ignoreSpacebar) {
      console.log('Jump disabled is false and char can jump');
      isJumping = true;
      setTimeout(() => {
        ignoreSpacebar = true;
      }, 300);
    } else {
      console.log('Jump disabled due to canyon fall or spacebar lock');
    }
  }

  if ((keyCode == 32 && isLeft) || (keyCode == 32 && isRight)) {
    isJumping = true;
    console.log('spacebar', isJumping);
  }
}

function keyReleased() {
  // if statements to control the animation of the character when
  // keys are released.

  console.log('keyReleased: ' + key);
  console.log('keyReleased: ' + keyCode);
  if (keyCode == 37) {
    isLeft = false;
    console.log('left arrow', isLeft);
  } else if (keyCode == 39) {
    isRight = false;
    console.log('right arrow', isRight);
  }

  if (keyCode == 32) {
    isJumpings = false;
    console.log('spacebar', isJumpings);
  }
}
