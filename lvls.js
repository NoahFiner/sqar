var Level = function(colnum, pcords, ecords, wcords, endType, endCoords) {
  this.cols = colnum;
  this.highscore = 398245293723495870;
  this.rows = this.cols/2;
  this.pcords = pcords;
  this.enum = ecords.length;
  this.ecords = ecords;
  this.wcords = wcords;
  this.wnum = wcords.length;
  this.type = endType;
  this.endcoords = endCoords;
  this.instruct = '';
  this.instructX = 0;
  this.instructY = 0;
  this.dpCoords = [];
  this.addInstruction = function(text, x, y) {
    this.instruct = text;
    this.instructX = x;
    this.instructY = y;
  }
  this.addDeathPanels = function(coords) {
    this.dpCoords = coords;
  }
}
var lvls = [];

//TYPES:
// 'player-end' has a green ending that runs p.win() when the player touches it
// 'enemy-end' has an orange ending that runs p.win() when an enemy touches it
// 'enemy-end-death' has a red ending that runs p.win() when an enemy touches it but runs p.die() if the player touches it

l1 = new Level(10, [2, 2], [[1, 2]], [[0, 1], [0, 2], [0, 3], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [9, 2]], 'player-end', [8, 2]);
l1.addInstruction("use the arrow keys to move you, the blue square<br>try to get to the green!", 1, 1);
lvls.push(l1);
l2 = new Level(6, [1, 1], [[1, 0]], [], 'player-end', [5, 1]);
l2.addInstruction("don't touch the red squares or else you'll have to restart.", 2, 2);
lvls.push(l2);
l3 = new Level(6, [1, 1], [[1, 0]], [], 'player-end', [5, 0]);
l3.addInstruction("try evading this red square", 0, 0);
lvls.push(l3);
l4 = new Level(6, [1, 1], [[1, 0], [1, 2]], [], 'player-end', [5, 0]);
l4.addInstruction("these red squares have an interesting, randomly based AI.<br>your intended outcome may not come immediately.", 3, 1);
lvls.push(l4);
l5 = new Level(6, [0, 1], [[0, 0]], [[2, 1], [2, 2]], 'player-end', [5, 1]);
l5.addInstruction("these gray squares are walls,<br> neither you or the red squares can move through them", 0, 0);
lvls.push(l5);
l6 = new Level(6, [0, 1], [[4, 1]], [[3, 1], [3, 2]], 'player-end', [5, 1]);
l6.addInstruction("hmm, maybe try getting close to the red square and taunting it...", 0, 2);
lvls.push(l6);
l7 = new Level(6, [1, 1], [[4, 1]], [[3, 1], [3, 2], [0, 0], [0, 1], [0, 2]], 'player-end', [5, 1]);
l7.addInstruction("alright, this is how the AI works<br><br>if the distance between the player and the red square<br>in the x axis is the largest,<br>the red square moves towards the player in the x.<br><br>It's the same deal with y.<br><br>The movement is random otherwise.", 0, 0);
lvls.push(l7);
l8 = new Level(6, [0, 1], [[0, 0], [0, 2]], [[4, 0], [4, 1]], 'player-end', [5, 1]);
l8.addInstruction("remember, the AI is random. <br>if you at first don't succeed, keep trying", 3, 2);
lvls.push(l8);
l9 = new Level(6, [0, 1], [[0, 0], [0, 2]], [[2, 1], [4, 0], [4, 1]], 'player-end', [5, 0]);
lvls.push(l9);
l10 = new Level(10, [4, 4], [[0, 0], [9, 0]], [[0, 4], [1, 4], [8, 4], [9, 4]], 'player-end', [5, 0]);
l10.addInstruction("uh oh! bigger grid size! good luck", 4, 3);
lvls.push(l10);
l11 = new Level(10, [4, 2], [[0, 3], [6, 0]], [[0, 4], [6, 2], [1, 1]], 'player-end', [7, 2]);
l11.addInstruction("these red squares aren't very smart... <br>try trapping them behind walls", 0, 2);
lvls.push(l11);
l12 = new Level(10, [9, 0], [[4, 1]], [[4, 3], [2, 1], [2, 3]], 'player-end', [3, 2]);
l12.addInstruction("a red square being diagonal to you by 1 in the x and y is death in corners...<br>...unless you move 0 in a direction", 4, 0);
lvls.push(l12);
l13 = new Level(10, [9, 0], [[4, 1], [2, 3]], [[4, 3], [2, 1]], 'player-end', [3, 2]);
l13.addInstruction("as long as you touch the green sqaure, you win.<br>an enemy jumping on top of you after you're there isn't harmful.", 5, 3);
lvls.push(l13);
l14 = new Level(10, [3, 1], [[1, 0], [6, 0]], [[4, 0], [4, 1], [4, 2], [4, 3] [5, 1], [5, 2]], 'player-end', [8, 1]);
l14.addInstruction("trapping might be a little helpful...", 0, 3);
lvls.push(l14);
l15 = new Level(10, [3, 2], [[9, 1]], [[3, 1], [4, 1], [4, 2], [4, 3], [6, 1], [6, 2], [6, 3], [6, 4], [8, 0], [8, 1], [8, 2], [8, 3]], 'player-end', [9, 0]);
l15.addInstruction("some luring could help fish this guy out", 0, 4);
lvls.push(l15);
l16 = new Level(10, [4, 4], [[0, 0], [9, 0]], [[0, 4], [5, 0], [5, 2], [5, 3], [6, 4], [7, 1], [7, 2], [7, 4], [8, 2], [8, 4], [9, 4]], 'player-end', [9, 2]);
lvls.push(l16);
l17 = new Level(10, [6, 2], [[1, 4], [7, 0], [9, 4]], [[4, 4], [4, 2], [8, 1], [8, 2]], 'player-end', [0, 0]);
l17.addInstruction("eek! three enemies! harder and harder, huh?", 6, 3);
lvls.push(l17);
l18 = new Level(10, [9, 0], [[8, 1], [0, 0]], [[1, 0], [1, 1], [1, 3], [1, 4], [3, 0], [4, 4], [4, 3]], 'player-end', [0, 4]);
l18.addInstruction("having untrapped enemies when trying to fish out another enemy is never a good idea", 2, 1);
lvls.push(l18);
l19 = new Level(10, [0, 2], [[9, 1], [9, 3]], [[8, 1], [8, 2], [8, 3], [2, 2]], 'player-end', [9, 2]);
l19.addInstruction("well, good luck with this one<br>I guess remember to not get too frustrated with the random AI.", 0, 4);
lvls.push(l19);
l20 = new Level(10, [0, 2], [[9, 1], [9, 2], [9, 3]], [[8, 1], [8, 2], [8, 3], [8, 4], [2, 2], [4, 2]], 'player-end', [9, 4]);
l20.addInstruction("that last level was just a training level");
lvls.push(l20);
l21 = new Level(10, [3, 2], [[1, 4], [5, 0]], [[0, 4], [0, 3], [1, 3], [2, 1], [2, 3], [3, 1], [4, 1], [4, 2], [4, 3], [4, 4]], 'player-end', [9, 2]);
lvls.push(l21);
l22 = new Level(14, [2, 6], [[1, 2], [8, 0], [11, 5]], [[2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [13, 1], [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4], [4, 5]], 'player-end', [13, 0]);
l22.addInstruction("some areas for trapping may not be apparent...", 0, 3);
lvls.push(l22);
l23 = new Level(10, [0, 0], [[2, 2], [7, 2]], [[1, 1], [1, 2], [2, 1], [8, 1], [8, 2], [7, 1]], 'player-end', [8, 3]);
lvls.push(l23);
l24 = new Level(6, [5, 2], [[1, 1], [3, 2]], [[2, 1], [4, 1]], 'player-end', [0, 2]);
lvls.push(l24);
l25 = new Level(12, [2, 5], [[4, 1], [4, 4], [7, 4]], [[4, 0], [4, 2], [4, 3], [4, 5], [6, 4], [9, 2]], 'player-end', [8, 2]);
l25.addInstruction("now the levels will get hard. good luck!", 7, 0);
lvls.push(l25);
l26 = new Level(12, [2, 3], [[0, 3], [4, 3], [9, 1]], [[5, 2], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [2, 0], [0, 2], [1, 2], [0, 4], [1, 4]], 'player-end', [11, 5]);
l26.addInstruction("just remember the trapping...<br>and the random luck of winning lol", 7, 0);
lvls.push(l26);
l27 = new Level(12, [0, 3], [[0, 5], [1, 4], [11, 4]], [[0, 4], [1, 3], [2, 2], [2, 1], [3, 1], [6, 3], [10, 3], [10, 4], [10, 5]], 'player-end', [11, 5]);
lvls.push(l27);
l28 = new Level(12, [0, 2], [[3, 0], [7, 5], [10, 0]], [[2, 0], [2, 1], [2, 2], [2, 3], [6, 4], [6, 5], [9, 0], [9, 1]], 'player-end', [11, 0]);
lvls.push(l28);
l29 = new Level(12, [0, 0], [[1, 1], [4, 2], [8, 4], [11, 4]], [[10, 1], [10, 2], [10, 3], [10, 4], [10, 5], [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [1, 2], [3, 2], [7, 5], [7, 4], [7, 3], [7, 2], [7, 1], [8, 3], [6, 3]], 'player-end', [11, 5]);
lvls.push(l29);
l29.addInstruction("you have fun with this monster", 4, 0);
l30 = new Level(12, [4, 1], [[0, 5], [8, 4], [11, 1]], [[0, 3], [1, 3], [2, 3], [2, 2], [3, 2], [4, 2], [4, 3], [5, 3], [10, 0], [10, 1], [10, 2], [10, 3]], 'player-end', [11, 0]);
l30.addInstruction("this guy will be a problem if he's not trapped", 1, 5);
lvls.push(l30);
l31 = new Level(4, [0, 0], [[0, 1]], [], 'enemy-end', [3, 1]);
l31.addInstruction("to win this level, you must make the red square go over the orange square")
lvls.push(l31);
l32 = new Level(4, [0, 0], [[0, 1]], [[2, 0]], 'enemy-end', [3, 1]);
l32.addInstruction("remember, if there's no where to move, move nowhere", 0, 1);
lvls.push(l32);
l33 = new Level(6, [0, 0], [[0, 2]], [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1]], 'enemy-end', [5, 1])
lvls.push(l33);
l34 = new Level(10, [0, 0], [[1, 1], [1, 3]], [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [4, 1], [4, 3], [5, 2], [6, 2], [7, 2], [8, 2]], 'enemy-end', [0, 4]);
lvls.push(l34);
l35 = new Level(10, [0, 0], [[1, 1], [1, 3], [9, 2]], [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [4, 1], [4, 3], [5, 2], [6, 2], [7, 2], [8, 2]], 'enemy-end', [0, 4]);
l35.addInstruction("fun, huh?", 3, 4);
lvls.push(l35);
l36 = new Level(4, [0, 0], [[0, 1]], [], 'enemy-end-death', [3, 1]);
l36.addInstruction("if the red square end is red, you can't touch it.");
lvls.push(l36);
l37 = new Level(6, [0, 0], [[0, 2]], [[0, 1], [1, 1], [2, 1], [3, 1], [5, 1]], 'enemy-end-death', [4, 1])
lvls.push(l37);
l38 = new Level(10, [0, 0], [[1, 1], [1, 3]], [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [8, 2], [9, 2]], 'enemy-end-death', [7, 2]);
lvls.push(l38);
l39 = new Level(12, [5, 0], [[0, 5], [0, 1]], [[0, 2], [1, 2], [2, 2], [3, 2], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [11, 1], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [5, 5]], 'enemy-end-death', [10, 1])
l39.addInstruction("now are times you don't want to trap enemies<br><br><br><br>...well, some enemies", 6, 0);
lvls.push(l39);
l40 = new Level(14, [0, 0], [[0, 6]], [[5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [10, 2], [10, 3], [10, 4], [10, 5], [9, 5], [8, 5], [7, 5], [6, 5], [5, 5], [4, 5], [3, 5], [3, 4], [3, 3], [3, 2], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3]], 'enemy-end-death', [4, 4])
lvls.push(l40);
l41 = new Level(6, [0, 0], [[1, 1], [5, 1]], [[4, 1], [4, 2]], 'player-end', [5, 2]);
l41.addDeathPanels([[1, 2]]);
l41.addInstruction("I wouldn't recommend touching that black thing...", 2, 0);
lvls.push(l41);
l42 = new Level(10, [5, 2], [[0, 2], [1, 2], [2, 2], [3, 2], [9, 3]], [[8, 1], [8, 2], [8, 3], [8, 4]], 'player-end', [9, 4]);
l42.addDeathPanels([[4, 2]]);
l42.addInstruction("you're welcome", 0, 3);
lvls.push(l42);
l43 = new Level(10, [9, 2], [[9, 3], [1, 2]], [[2, 2], [8, 4], [8, 3], [8, 2], [8, 1], [7, 1], [6, 1], [6, 2]], 'player-end', [0, 2]);
l43.addDeathPanels([[7, 2]]);
lvls.push(l43);
l44 = new Level(10, [7, 3], [[1, 1], [1, 3], [9, 2]], [[2, 1], [2, 3], [8, 1], [8, 2], [8, 3], [8, 4], [6, 0], [6, 1], [6, 2], [5, 3]], 'enemy-end', [9, 3]);
l44.addDeathPanels([[7, 4]]);
lvls.push(l44);
l45 = new Level(10, [4, 1], [[3, 3], [6, 3]], [[3, 2], [4, 2], [5, 2], [6, 2]], 'enemy-end-death', [6, 4]);
l45.addDeathPanels([[2, 2], [7, 2]]);
lvls.push(l45);
l46 = new Level(10, [0, 0], [[0, 4], [4, 4], [9, 3]], [[8, 1], [8, 2], [8, 3], [8, 4]], 'player-end', [9, 4]);
l46.addDeathPanels([[2, 2]]);
lvls.push(l46);
l47 = new Level(10, [9, 0], [[3, 2], [4, 2], [0, 3]], [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 2], [6, 2], [7, 2], [8, 2], [1, 3], [1, 2]], 'player-end', [0, 2]);
l47.addDeathPanels([[4, 3]]);
lvls.push(l47);
l48 = new Level(6, [0, 2], [[3, 2], [5, 2]], [], 'enemy-end-death', [1, 2]);
l48.addDeathPanels([[2, 2]]);
lvls.push(l48);
l49 = new Level(10, [0, 2], [[3, 1], [4, 1], [5, 1], [4, 3], [6, 3]], [[3, 2], [4, 2], [5, 2], [6, 2]], 'player-end', [7, 2]);
l49.addDeathPanels([[2, 2]]);
lvls.push(l49);
l50 = new Level(10, [9, 4], [[8, 2], [6, 4], [6, 2], [3, 0], [1, 3], [0, 0], [2, 1]], [], 'enemy-end-death', [0, 2]);
l50.addDeathPanels([[8, 3]]);
lvls.push(l50);
