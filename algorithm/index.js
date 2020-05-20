
const caracol = ( array = [] ) => {
    var max_row = array.length - 1;
    if (max_row < 0) {
        return [];
    }
    if (max_row === 0) {
        return array[0];
    }
    if (typeof array[0] !== 'object') {
        return array;
    }
    var max_col = array[0].length - 1;
    var keep_moving = true;
    var new_array = [];
    var x = 0, y = 0;
    var move = 'rigth';
    var limit_x = 0;
    var limit_y = 0;
    while ( keep_moving ) {
        if (x==0 && y == 0) {
            new_array.push(array[y][x]);
            array[y][x] = null;
        }
        switch (move) {
            case 'rigth':
                x++;
                if ( x > max_col ) {
                    move = 'down';
                    max_col--;
                    x--;
                    y++;
                    limit_y++;
                }
                break;
            case 'down':
                y++;
                if ( y > max_row ) { 
                    move = 'left';
                    max_row--;
                    x--;
                    y--;
                }
                break;
            case 'left':
                x--;
                if ( x < limit_x ) {
                    move = 'up';
                    x = limit_x;
                    limit_x++;
                    y--;
                }
                break;
            case 'up':
                y--;
                if ( y < limit_y ) {
                    move = 'rigth';
                    y = limit_y;
                    limit_y++;
                    x++;
                }
                break;
            default:
                keep_moving = false;
                break;
        }
        new_array.push(array[y][x]);
        array[y][x] = null;
        if ( array.every(item=> item.every(item=>item === null )) ) {
            keep_moving = false;
        }
    }
    return new_array;
}
// Local test
//console.log(caracol( [ [1, 2, 3, 4, 5], [ 10, 9, 8, 7 ,6] ] ))

module.exports = { 
    caracol: caracol
};