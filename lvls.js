var Level = function(colnum, pcords, ecords, wcords) {
  this.cols = colnum;
  this.rows = this.cols/2;
  this.pcords = pcords;
  this.enum = ecords.length;
  this.ecords = ecords;
  this.wcords = wcords;
  this.wnum = wcords.length;
}

l1 = new Level(10, [2, 2], [[1, 2]], [[0, 1], [0, 2], [0, 3], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [9, 2]]);
l2 = new Level(20, [1, 1], [[4, 3]], [[4, 2]]);


lvls = [l1, l2]
