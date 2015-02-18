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

var matrix;

/**
 * Spec 1
 */
describe("Tests for ClearMatrix feature", function() {

    var aliveCells;

    beforeEach(function() { aliveCells = document.querySelectorAll( ".alive" ); });


    it("should be 6 .alive items, so aliveCells.length should be 6 (original DOM set)", function() {
        expect(aliveCells.length).toEqual(6);
        clearMatrix();
    });

    it("should remove .alive class from all Matrix indexes, so aliveCells.length should be 0", function() {
        expect(aliveCells.length).toEqual(0);
    });

});

/**
 * Spec 2
 */
describe("Tests for GetNeighbors feature", function() {

    matrix = 
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

    for(index in matrix)
    {
        it("should return neighbors from Node " + index, function() {
            expect( getNeighbors(index) ).toEqual(matrix[ index ]);
        });
    }
});


/**
 * Spec 3 ToDo: DOM Events
 */