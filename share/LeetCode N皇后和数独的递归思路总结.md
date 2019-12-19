# LeetCode N皇后和数独的递归思路总结

分析基于于 [LeetCode #51 N皇后](https://leetcode.com/problems/n-queens) 和 [LeetCode #37 数独求解](https://leetcode.com/problems/sudoku-solver/)。

## 1. 寻找递归变量

N皇后问题，变量是放置好的皇后的数量，变量是level从是0最终递归到N，伪码如下：

```
func(level) {
  loop col 0 -> n {
  	func(level + 1);
  }
}
```	

Sukodu问题，变量是每一个没有放置好数字的单元格，伪码如下：

```
w = board.length;

func() {
	loop i 0 -> w {
	   loop j 0 -> w {
     	 	func();  
	   }
	} 	
}
```



## 2. 何时寻找到解

N皇后问题，递归到了第N层，说明所有的皇后都已经落位置了。

设置合理的数据结构存储结果数据这里显得尤其重要，这里我们数组，下标为i的位置存储第i行皇后的放置位置：比如match[0]为1，表示第1行的皇后放置在了第2列的位置。

递归到了第N层，将结构填充到存储结果的变量即可，伪码如下：

```
var result = [];

func(level, match) {
+ if(level == n) result.push(match);
  loop col 0 -> n {
+  	func(level + 1, [...match, col]);
  }
}

func(0, []);

```	

Sukodu问题稍微特殊一点，因为假设只有一个结果，我们将结果仍旧存储初始的棋盘board中，递归到所有单元格后，board便是最终结果了，这里dosomething代码在后续进行介绍。

```
func(board) {
   w = board.length;
	loop i 0 -> w {
	   loop j 0 -> w {
	     if(board[i][j]=== '.') {
	         // dosomething
     	 	  func(board);  
	         // dosomething
     	  }
	   }
	} 	
}
```


## 3. 如何回溯

最难的部分大概是执行过程如何回溯，在寻找解的过程中，必定有一些条件会让递归提前终止，从而返回进行回溯，进行其他选项的递归。

比如，我们尝试在N皇后的棋盘上，第1行(0,0)放置一个皇后，然后第2行在 (1,2)的位置放置第二个皇后，再在第3行发现无法放置皇后，需要依次将放置的结果进行回撤：先将第2行的皇后方式在(1,3)，第3行还是无法找到合理放置位置，继续回溯直到将第1行的皇后放置(0,1)位置上。

这里涉及两个关键

- 第一个是如何判定不满足条件的轮训
- 第二个是如何如何将递归后填写的数据回溯

N皇后的伪码如下：

- 第一个问题，N皇后的规则即在横竖撇捺的方向都不能皇后冲突，只要皇后之间的x坐标、y坐标、x+y、x-y不相等即可。
- 第二个问题。因为巧妙地将结果存储在了match中，每次调用func的match都是全新的，不会影响到父级调用的结果，不需要回溯。

```
var result = [];

func(level, match) {
 if(level == n) result.push(match);
  loop col 0 -> n {
+  	if(isValid(match, col)) {
  	  	func(level + 1, [...match, col]);
+  	}
  }
}

func(0, []);
```	

数独的伪码如下：

- 每次都递归棋盘发现没有填写的数字位
- 有就尝试将'1'到'9'尝试填写到该该位置上
- 开始下一层递归，注意到在函数末尾的`return true`代表棋盘遍历后，所有位置都填充好了数字
- 而`if(func()){ return true;}`只是来自底层递归的结果往上返回，`return false`则代表一个格子上填充任一个数字的尝试都失败了。

如果递归完棋盘发现所有数字都放置好了，就直接返回true。


```
func(board) {
   w = board.length;
	loop i 0 -> w {
	   loop j 0 -> w {
+	   		if(board[i][j] === '.') {
+	   			for k '1' -> '9' {
+	   				if(isValid(i, j, k) {
+	   					board[i][j] = k;
+	   					if(func()) {
+	   				     return true;
+	   				   } else {
+	   				     board[i][j] = '.';
+	   				   }
+	   				}
+	   			}
+	   			return false;
+	   		}
	   }
	} 	
+	return true;
}
```

## 4. JavaScript版本的实现


### N皇后

可以看到用cols、pie、la分别存储了放置皇后的 col、x-y、x+的值，着实巧妙。

```
var solveNQueens = function(n) {
  var cols = [], pie = [], la = [];
  var result = [];
  function nthQueue(level, match) {
    if(level === n) result.push(match);
    for (let i = 0; i < n; i++) {
      if(cols.indexOf(i) === -1 && pie.indexOf(level + i) === -1 && la.indexOf(level - i) === -1) {
        cols.push(i);
        pie.push(level + i);
        la.push(level - i);
        nthQueue(level + 1, [...match, i])
        cols.pop();
        pie.pop();
        la.pop();
      }
    }
  } 
  nthQueue(0, []);
  return result.map(d => {
    return d.map(dd => {
      let s = '';
      for(let i = 0; i < n; i++) {
        s += ((i == dd) ? 'Q' : '.')
      }
      return s;
    })
  })
}

console.log(JSON.stringify(solveNQueens(4))=='[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]');

```

### 数独

```

  var input = [
      ["5","3",".",".","7",".",".",".","."],
      ["6",".",".","1","9","5",".",".","."],
      [".","9","8",".",".",".",".","6","."],
      ["8",".",".",".","6",".",".",".","3"],
      ["4",".",".","8",".","3",".",".","1"],
      ["7",".",".",".","2",".",".",".","6"],
      [".","6",".",".",".",".","2","8","."],
      [".",".",".","4","1","9",".",".","5"],
      [".",".",".",".","8",".",".","7","9"],
  ];

  var output = [
      ["5","3","4","6","7","8","9","1","2"],
      ["6","7","2","1","9","5","3","4","8"],
      ["1","9","8","3","4","2","5","6","7"],
      ["8","5","9","7","6","1","4","2","3"],
      ["4","2","6","8","5","3","7","9","1"],
      ["7","1","3","9","2","4","8","5","6"],
      ["9","6","1","5","3","7","2","8","4"],
      ["2","8","7","4","1","9","6","3","5"],
      ["3","4","5","2","8","6","1","7","9"]
  ];

  var solveSudoku = function(board) {
    let w = board.length;
    var isValid = function(x, y, v){
      for (let i = 0; i < w; i++) {
        if(board[x][i] == v || board[i][y] == v) return false;
        for (let j = Math.floor(x/3)*3; j < (Math.floor(x/3)+1)*3; j++) {
          for (let k = Math.floor(y/3)*3; k < (Math.floor(y/3)+1)*3; k++) {
            if(board[j][k] == v) return false;
          }
        }
      }
      return true;
    }
    var visitSudoku = function() {
      for (let i = 0; i < w; i++) {
        for (let j = 0; j < w; j++) {
          if(board[i][j] === '.')  {
            for (let k = 1; k <= w; k++) {
              if(isValid(i, j, k+'')) {
                board[i][j] = k+'';
                if(visitSudoku()) {
                  return true;
                } else {
                  board[i][j] = '.';
                }
              }
            }
            return false;
          }

        }
      }
      return true;
    }
    visitSudoku()
    return board;
  }
  
  console.log(JSON.stringify(solveSudoku(input))===JSON.stringify(output))
  ```




