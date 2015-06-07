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
}
var lvls = [];

l1 = new Level(10, [2, 2], [[1, 2]], [[0, 1], [0, 2], [0, 3], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [9, 2]], 'player-end', [8, 2]);
lvls.push(l1);
l2 = new Level(6, [1, 1], [[1, 0]], [], 'player-end', [5, 1]);
lvls.push(l2);
l3 = new Level(6, [1, 1], [[1, 0]], [], 'player-end', [5, 0]);
lvls.push(l3);
l4 = new Level(6, [1, 1], [[1, 0], [1, 2]], [], 'player-end', [5, 0]);
lvls.push(l4);
l5 = new Level(6, [0, 1], [[0, 0]], [[2, 1], [2, 2]], 'player-end', [5, 1]);
lvls.push(l5);
l6 = new Level(6, [0, 1], [[4, 1]], [[3, 1], [3, 2]], 'player-end', [5, 1]);
lvls.push(l6);
l7 = new Level(6, [1, 1], [[4, 1]], [[3, 1], [3, 2], [0, 0], [0, 1], [0, 2]], 'player-end', [5, 1]);
lvls.push(l7);
l8 = new Level(6, [0, 1], [[0, 0], [0, 2]], [[4, 0], [4, 1]], 'player-end', [5, 1]);
lvls.push(l8);
l9 = new Level(6, [0, 1], [[0, 0], [0, 2]], [[2, 1], [4, 0], [4, 1]], 'player-end', [5, 0]);
lvls.push(l9);
