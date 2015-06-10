var Level = function(colnum, pcords, ecords, wcords, endType, endCoords) {
  this.cols = colnum;
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
  this.addInstruction = function(text, x, y) {
    this.instruct = text;
    this.instructX = x;
    this.instructY = y;
  }
}
var lvls = [];

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
l18 = new Level(10, [9, 0], [[8, 1], [3, 4]], [[1, 0], [1, 1], [1, 3], [1, 4], [3, 0], [4, 4]], 'player-end', [0, 3]);
lvls.push(l18);
l19 = new Level(10, [0, 2], [[9, 1], [9, 3]], [[8, 1], [8, 2], [8, 3], [2, 2]], 'player-end', [9, 2]);
l19.addInstruction("well, good luck with this one<br>I guess remember to not get too frustrated with the random AI.", 0, 4);
lvls.push(l19);
l20 = new Level(10, [0, 2], [[9, 1], [9, 2], [9, 3]], [[8, 1], [8, 2], [8, 3], [8, 4], [2, 2], [4, 2]], 'player-end', [9, 4]);
l20.addInstruction("that last level was just a training level");
lvls.push(l20);
