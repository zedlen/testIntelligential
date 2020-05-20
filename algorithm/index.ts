const caracol = ( array = [] ) => {
    var max_row = array.length - 1;
    if (max_row <= 0) {
        return [];
    }
    var max_col = array[0].length - 1;
    var keep_moving = true;
    var new_array = [];
    var x = 0, y = 0;
    var move = 'rigth';
    var limit_x = 0;
    var limit_y = 0;
    while ( keep_moving ) {               
        new_array.push(array[y][x]);                     
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
        if ( x !== 0 && y !== 0 && max_row === max_col && x === y ) {
            keep_moving = false;         
        }        
    }
    return new_array;
}

export default caracol