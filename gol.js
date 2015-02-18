window.onload = init;

	var matrix = 
	[
		[1, 4,  5]
		,[0, 2,  4,  5,  6]
		,[1, 3,  5,  6,  7]
		,[2, 6,  7]
		,[0, 1,  5,  8, 9]
		,[0, 1,  2,  4,  6,  8, 9, 10]
		,[1, 2,  3,  5,  7, 9, 10, 11]
		,[2, 3,  6, 10, 11]
		,[4, 5, 9, 12, 13]
		,[4, 5,  6,  8, 10, 12, 13, 14]
		,[5, 6,  7, 9, 11, 13, 14, 15]
		,[6, 7, 10, 14, 15]
		,[8, 9, 13]
		,[8, 9, 10, 12, 14]
		,[9, 10, 11, 13, 15]
		,[10, 11, 14]
	];

	function init()
	{
		for(i=0;i<=4;i++)
		{
			var el = document.getElementById( Math.floor( Math.random() *(15 + 0) ).toString() );
			el.classList.add("alive");
		}
	}

	function getNeighbors(id)
	{
		return matrix[ id ];
	}

	function setCellStatus( id, alive )
	{
		var currentCell = document.getElementById( id );

		if( alive > 3 || alive < 2 )
		{
			currentCell.classList.remove( "alive" );
		}
		else if( alive === 3 )
		{
			currentCell.classList.add( "alive" );
		}
	}

	function setNextGeneration()
	{
		var stack = [];

		for( cell in matrix )
		{
			var currentCell =  cell 
				,neighbors = getNeighbors( currentCell );
			var alive = 0;
				//console.log(neighbors);return;
			for( neighbor in neighbors )
			{
				//console.log(neighbors[neighbor]);return;
				neighbor = document.getElementById(neighbors[neighbor]);
				//console.log(neighbor);
				var isAlive = /alive/.test( neighbor.className );
				//console.log( neighbor.className );
				if( isAlive )
				{
					alive++;
				}
				//console.log(a, " - ", alive);
			}
			//console.log(currentCell, " - ", alive);
			stack[currentCell] = { "id": currentCell, "status": alive };
			//setCellStatus( currentCell, alive );
			
		}
		//console.log(stack);
		for(item in stack)
		{
			console.log(stack[item].id, " - ",stack[item].status);
			setCellStatus( stack[item].id, stack[item].status );
		}


	}


/*
---------------------------------------------
|  Cell  |			 Neighboors			    |
---------------------------------------------
|    1 	 |  2,  5,  6 						|
|    2 	 |  1,  3,  5,  6,  7 				|
|    3 	 |  2,  4,  6,  7,  8 				|
|    4 	 |  3,  7,  8 						|
|    5   |  1,  2,  6,  9, 10 				|
|    6   |  1,  2,  3,  5,  7,  9, 10, 11 	|
|    7   |  2,  3,  4,  6,  8, 10, 11, 12 	|
|    8 	 |  3,  4,  7, 11, 12 				|
|    9	 |  5,  6, 10, 13, 14 				|
|   10	 |  5,  6,  7,  9, 11, 13, 14, 15 	|
|   11	 |  6,  7,  8, 10, 12, 14, 15, 16 	|
|   12	 |  7,  8, 11, 15, 16 				|
|   13	 |  9, 10, 14 						|
|   14	 |  9, 10, 11, 13, 15 				|
|   15	 | 10, 11, 12, 14, 16 				|
|   16   | 11, 12, 15 						|
---------------------------------------------
*/