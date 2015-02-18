/**
 * @function annon. closure
 * @description Main implementation closure (avoids exposing functions to global scoop)
 * @param object a window
 */
;( function( a )
{
	window.onload = init;

	/**
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
	]
	,nextGenerationBtn = document.getElementById( "next-step" )
	,startBtn 		   = document.getElementById( "start" 	  )
	,board 			   = document.getElementById( "board" 	  );
	
	/**
	 * DOM Bindings (actions)
	 */
	nextGenerationBtn.addEventListener( "click", setNextGeneration );
	startBtn		 .addEventListener( "click", init 			   );
	board			 .addEventListener( "click", toggleCellStatus  );

	/**
	 * @function
	 * @description Initialize method
	 * @return void
	 */
	function init()
	{
		var count = 0;

		clearMatrix();

		while( count <= 5 )
		{
			var el = document.getElementById( Math.floor( Math.random() * ( 15 + 0 ) ).toString() );

			if( el.classList.contains( "alive" ) )
			{
				continue;
			}
			else
			{
				el.classList.add( "alive" );
				count++;
			}
		}

		return;
	}

	/**
	 * @function
	 * @description Clear Board Matrix
	 * @return void
	 */
	function clearMatrix()
	{
		var aliveCells = document.querySelectorAll( ".alive" );

		if( aliveCells.length === 0 ) return;

		for( aliveCell in aliveCells )
		{
			aliveCells.item( aliveCell ).classList.remove("alive");
		}
	}

	/**
	 * @function
	 * @description Get Cell neighbors by Matrix ID
	 * @param  integer id
	 * @return array   neighbors
	 */
	function getNeighbors( id )
	{
		return matrix[ id ];
	}

	/**
	 * @function
	 * @description Set Cell Status : [dead, alive]
	 * @param integer id
	 * @param integer alive counter
	 * @return void
	 */
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

	/**
	 * @function
	 * @description Custom Cell Status Toggling action : [dead, alive]
	 * @param object event target
	 * @return void
	 */
	function toggleCellStatus( event )
	{
		var el = event.target;

		if( el.classList.contains( "cell" ) )
		{
			el.classList.toggle( "alive" );
		}
	}

	/**
	 * @function
	 * @description Trigger next Generation step
	 * @return void
	 */
	function setNextGeneration()
	{
		var stack = [];

		for( cell in matrix )
		{
			var alive 		 = 0
				,currentCell =  cell 
				,neighbors   = getNeighbors( currentCell );

			for( neighbor in neighbors )
			{
				neighbor = document.getElementById(neighbors[neighbor]);

				var isAlive = /alive/.test( neighbor.className );

				if( isAlive )
				{
					alive++;
				}
			}

			stack[currentCell] = { "id": currentCell, "status": alive };
		}

		for( currentItem in stack )
		{
			setCellStatus( stack[ currentItem ][ "id" ], stack[ currentItem ].status );
		}
	}

})( window );