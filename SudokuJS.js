var toggleJumble;
window.setInterval(
	function show()
	{
		if(toggleJumble == true)
		{
			for (var y = 0; y < 9; y++) 
			{
				for (var x = 0; x < 9; x++) 
				{
					
					var top = sudokuGrid[y][x].style.top;
					var left = sudokuGrid[y][x].style.left;
					top = top.split("px")
					left = left.split("px")
					var numtop = parseInt(top[0]) + Math.random()*2 - 0.5;
					var numleft = parseInt(left[0]) + Math.random()*2 - 0.5;
					//console.log(num);
					sudokuGrid[y][x].style.top = numtop.toString() + "px";					
					sudokuGrid[y][x].style.left = numleft.toString() + "px";					
				}
			}
		}
	}
,50);

function ToggleJumble()
{
	toggleJumble = !toggleJumble;
	if(!toggleJumble)
	{
		var tempX = startX;
		var tempY = startY;

		for (var y = 0; y < 9; y++) 
		{
			tempX = startX;
			for (var x = 0; x < 9; x++) 
			{
				sudokuGrid[y][x].style.top = (tempY) + "px";
				sudokuGrid[y][x].style.left = (tempX) + "px";

				tempX += widthCell;
				if ((x+1)%3==0)
				{
					tempX += 4;
				}
			}
			tempY += heightCell;
			if ((y+1)%3==0)
			{
				tempY += 4;
			}
		}
	}
}


var startX = 10;
var startY = 10;
var widthCell = 50;
var heightCell = 50;

var selectedSquare;

var sudokuGrid = [];

document.addEventListener('keypress', function (e) 
	{
		if ((e.keycode >=48 && e.keycode <=57) || (e.which >=48 && e.which <=57))
		{
			var i;
			//var all = document.getElementsByClassName('grid');
			//for (var i = 0; i < all.length; i++) {
  			//	all[i].style.borderColor = '#21ff5c';
			//}
			if(e.keycode == null)
			{
				i = e.which - 48;
			}
			else
			{
				i = e.keycode - 48;
			}
			
			if(selectedSquare != null)
			{
				if(i == 0)
				{
					selectedSquare.innerHTML = "<p>" + "</p>";
				}
				else
				{
					selectedSquare.innerHTML = "<p>" + (i) + "</p>";
					if(CheckSolved())
					{
						alert("Solved");
					}
				}	
			}
		}	
	})

function Init()
{
	win = false;
	HintReset(3);
	for (var y = 1; y < 10; y++) 
	{
		var tempArray = [];
		for (var x = 1; x < 10; x++) 
		{
			var string = x.toString() + y.toString();
			//console.log(string);
			tempArray.push(document.getElementById(string));
		}
		sudokuGrid.push(tempArray);
	}
	
	var tempX = startX;
	var tempY = startY;
	//sudokuGrid[1][1].style.backgroundColor = "grey";

	for (var y = 0; y < 9; y++) 
	{
		tempX = startX;
		for (var x = 0; x < 9; x++) 
		{
			sudokuGrid[y][x].style.top = (tempY) + "px";
			sudokuGrid[y][x].style.left = (tempX) + "px";
			sudokuGrid[y][x].addEventListener('click', function(event){
				
				//console.log(event.target.parentNode);
				if(event.target.id == "")
				{
					SelectSquare(event.target.parentNode.id);

				}
				else
				{
					SelectSquare(event.target.id);
				}
			});
			SetNum(x,y,0);
			tempX += widthCell;
			if ((x+1)%3==0)
			{
				tempX += 4;
			}
		}
		tempY += heightCell;
		if ((y+1)%3==0)
		{
			tempY += 4;
		}
	}

	// Buttons
	tempX = startX;
	tempY += 50;
	for (var x = 0; x < 10; x++) 
	{
		var string = "button" + x.toString();
		//console.log(string);
		var button = document.getElementById(string);
		button.style.top = (tempY) + "px";
		button.style.left = (tempX) + "px";
		button.addEventListener('mouseover', function(event){
				var str;
				if(event.target.id == "")
				{
					str = event.target.parentNode.id;

				}
				else
				{
					str = event.target.id;
				}

				document.getElementById(str).style.backgroundColor = "#f5856c";
		});
		button.addEventListener('mouseout', function(event){
				var str;
				if(event.target.id == "")
				{
					str = event.target.parentNode.id;

				}
				else
				{
					str = event.target.id;
				}

				document.getElementById(str).style.backgroundColor = "#f7db5c";
		});
		button.addEventListener('click', function(event){
				
				var str;
				if(event.target.id == "")
				{
					str = event.target.parentNode.id;

				}
				else
				{
					str = event.target.id;
				}
				//console.log(str);
				var i = parseInt(str.replace("button", ""));
				//console.log(i);
				if(selectedSquare != null)
				{
					if(i == 0)
					{
						selectedSquare.innerHTML = "<p>" + "</p>";
					}
					else
					{
						selectedSquare.innerHTML = "<p>" + (i) + "</p>";
						if(CheckSolved())
						{
							alert("Solved");
							win = true;
						}
					}	
				}

			});
		tempX += widthCell;
	}

	LoadNew(0);
	clearSudoku = false;
}

function CheckSolved()
{
	if(!clearSudoku)
	{
		for (var y = 0; y < 9; y++) 
		{
			for (var x = 0; x < 9; x++) 
			{
				if(sudokuBoard[y][x] != GetNum(x,y))
				{
					return false;
				}			
			}
		}
		return true;
	}
}

var clearSudoku;
function Clear()
{
	HintReset(0);
	clearSudoku = true;
	for (var y = 0; y < 9; y++) 
	{
		for (var x = 0; x < 9; x++) 
		{
			sudokuGrid[y][x].style.backgroundColor = "lightgrey"
			SetNum(x,y,0);						
		}
	}
}

function HintReset(num)
{
	hintTotal = num;
	document.getElementById("hintButton").innerHTML = "Hints: " + hintTotal;

}

var hintTotal;
function Hint()
{
	DeselectSquare();
	if(hintTotal > 0)
	{
		hintTotal -= 1;
		document.getElementById("hintButton").innerHTML = "Hints: " + hintTotal;

		var toSolve = [];
		var wrong = [];
		for (var y = 0; y < 9; y++) 
		{
			for (var x = 0; x < 9; x++) 
			{
				if(sudokuGrid[y][x].style.backgroundColor != "grey")
				{
					if(GetNum(x,y)!=0)
					{
						if(GetNum(x,y) != sudokuBoard[y][x])
						{
							wrong.push([x,y]);
						}
					}
					else
					{
						toSolve.push([x,y]);
					}
				}			
			}
		}

		if(wrong.length > 0)
		{
			var i = Math.floor(Math.random()*wrong.length);
			var x = wrong[i][0];
			var y = wrong[i][1];

			var num = sudokuBoard[y][x];
			sudokuGrid[y][x].style.backgroundColor = "lightgreen";
			SetNum(x,y,num);
		}
		else if(toSolve.length > 0)
		{
			var i = Math.floor(Math.random()*toSolve.length);
			var x = toSolve[i][0];
			var y = toSolve[i][1];

			var num = sudokuBoard[y][x];
			sudokuGrid[y][x].style.backgroundColor = "lightgreen";
			SetNum(x,y,num);
		}
	}
}

function SolveRemaining()
{
	if(!clearSudoku)
	{
		for (var y = 0; y < 9; y++) 
		{
			for (var x = 0; x < 9; x++) 
			{
				if(sudokuGrid[y][x].style.backgroundColor != "grey" && sudokuGrid[y][x].style.backgroundColor != "lightgreen")
				{
					var num = sudokuBoard[y][x]
					sudokuGrid[y][x].style.backgroundColor = "pink";
					SetNum(x,y,num);
				}			
			}
		}
	}	
	else
	{
		DeselectSquare()
		for (var y = 0; y < 9; y++) 
		{
			for (var x = 0; x < 9; x++) 
			{				
				var num = GetNum(x,y);
				if (num != 0)
				{
					sudokuGrid[y][x].style.backgroundColor = "grey";
				}
				sudokuBoard[y][x] = num;				
			}
		}
		if(BruteForce(0,0))
		{
			for (var y = 0; y < 9; y++) 
			{
				for (var x = 0; x < 9; x++) 
				{
					if(sudokuGrid[y][x].style.backgroundColor != "grey")
					{
						var num = sudokuBoard[y][x]
						sudokuGrid[y][x].style.backgroundColor = "pink";
						SetNum(x,y,num);
					}			
				}
			}
		}
		else
		{
			alert("Not solvable");
		}
	}
}

var difficultyGrid = [];
function LoadNew(dif)
{
	HintReset(3 + dif);
	clearSudoku = false;
	difficultyGrid = [
	[0,0,0, 0,0,0, 0,0,0],
    [0,0,0, 0,0,0, 0,0,0],
    [0,0,0, 0,0,0, 0,0,0],
    
    [0,0,0, 0,0,0, 0,0,0],
    [0,0,0, 0,0,0, 0,0,0],
    [0,0,0, 0,0,0, 0,0,0],
    
    [0,0,0, 0,0,0, 0,0,0],
    [0,0,0, 0,0,0, 0,0,0],
    [0,0,0, 0,0,0, 0,0,0]];

	solver();

	for (var y = 0; y < 9; y++) 
	{
		for (var x = 0; x < 9; x++) 
		{
			difficultyGrid[y][x] = Math.min(Math.max(Math.ceil(Math.random()*(10)-2-dif*3),0),1);
		}
	}

	for (var y = 0; y < 9; y++) 
	{
		for (var x = 0; x < 9; x++) 
		{
			sudokuGrid[y][x].style.backgroundColor = "lightgrey";
			var num = sudokuBoard[y][x] * difficultyGrid[y][x];
			if(num!=0)
			{
				sudokuGrid[y][x].style.backgroundColor = "grey";
			}
			SetNum(x,y,num);
		}
	}
}

function SelectSquare(id)
{
	if(selectedSquare != null)
	{
		selectedSquare.style.backgroundColor = "lightgrey";
	}
	if(document.getElementById(id).style.backgroundColor == "lightgrey")
	{		
		selectedSquare = document.getElementById(id);
	
		selectedSquare.style.backgroundColor = "#f5856c";
	}
	else
	{
		selectedSquare = null;
	}
}

function DeselectSquare()
{
	if(selectedSquare != null)
	{
		selectedSquare.style.backgroundColor = "lightgrey";
	}
	selectedSquare = null;
}

function GetNum(x,y)
{
	var temp = sudokuGrid[y][x].innerHTML.split(/<p>|<\/p>/);
	if (temp[1] == "")
	{
		return 0;
	}
	else
	{
		return parseInt(temp[1]);
	}	
}

function SetNum(x,y,num)
{
	if(num == 0)
	{
		sudokuGrid[y][x].innerHTML = "<p>" + "</p>";
	}
	else
	{
		sudokuGrid[y][x].innerHTML = "<p>" + (num) + "</p>";
	}	
}