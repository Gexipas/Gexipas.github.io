var sudokuBoard = [];

var numberChecks = [];
var areaChecks = [];
var numberSolved = 0;
var bruteCount = 0;
var iterationCount = 0;

function solver()
{
	sudokuBoard = [
	[0,0,0, 0,0,0, 0,0,0],
    [0,0,0, 0,0,0, 0,0,0],
    [0,0,0, 0,0,0, 0,0,0],
    
    [0,0,0, 0,0,0, 0,0,0],
    [0,0,0, 0,0,0, 0,0,0],
    [0,0,0, 0,0,0, 0,0,0],
    
    [0,0,0, 0,0,0, 0,0,0],
    [0,0,0, 0,0,0, 0,0,0],
    [0,0,0, 0,0,0, 0,0,0]];

    for (var i = 0; i < 10; i++)
  	{
    	var x = Math.floor(Math.random()*9);
		var y = Math.floor(Math.random()*9);
		var num = Math.floor(Math.random()*9);
		if (sudokuBoard[y][x] == 0 && CheckNum(x,y,num))
		{
			sudokuBoard[y][x] = num;
		}		
	}

    return BruteForce(0,0);

	//for (var i = 0; i < 20; i++)
  	//{
    //	var x = Math.floor(Math.random()*9);
	//	var y = Math.floor(Math.random()*9);
	//	if (sudokuBoard[y][x] != 0)
	//	{
	//		sudokuBoard[y][x] = 0;
	//	}
	//}
}

// checks if number can be placed
function CheckNum(row, col, num)
{
  	var x = Math.floor(row/3)*3;
  	var y = Math.floor(col/3)*3;
  
  	for (var i = x; i<(x+3); i++)
  	{
  		for(var j = y; j < (y+3); j++)
  		{
  			if (sudokuBoard[j][i] == num)
  			{
        		return false;
  			}
  		}      
  	}       
  
  	for (var i = 0; i < 9; i++)
  	{
		if (sudokuBoard[col][i] == num)
		{
			return false;
		}
	}       
  
  	for (var i = 0; i < 9; i++)
  	{
    	if (sudokuBoard[i][row] == num)
    	{
     		return false;    
    	}	
  	}
  
  	return true;
}

function BruteForce(row,col)
{
	bruteCount += 1;
	
	if (col == 9)
	{
		return true;
	}

	if(bruteCount > 3000000)
	{
		return false;
	}

	if (sudokuBoard[col][row] == 0)
	{
		for (var i = 1; i < 10; i++)
		{
			if(CheckNum(row,col,i))
			{
				sudokuBoard[col][row] = i;
				numberSolved += 1;

				var x = row + 1;
				var y = col;
				if (x == 9)
				{
					x = 0;
					y += 1;
				}
				if(BruteForce(x,y))
				{
					return true;
				}

				sudokuBoard[col][row] = 0;
				numberSolved -= 1;
			}
		}
	}
	else
	{
		var x = row + 1;
		var y = col;
		if (x == 9)
		{
			x = 0;
			y += 1;
		}
		if(BruteForce(x,y))
		{
			return true;
		}
	}
	return false;
}
  
  