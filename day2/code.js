const { readFileSync } = require('fs');
const  path = require('path')

const input = readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

function calculate(){
    const array = []
    input.split('\n').forEach((x) => {
        const values = x.split(' ');
        values[0] = values[0] == 'A' ? 1 : values[0] == 'B' ? 2 : 3; 
        values[1] = values[1] == 'X' ? 1 : values[1] == 'Y' ? 2 : 3; 
        let result = values[0] == values[1] ? 3 : 0;
        if(values[0] == values[1]) {
            result = 3;
        } else if( values[0] == 3 && values[1] == 1 || values[0] == 2 && values[1] == 3 || values[0] == 1 && values[1] == 2){
            result = 6;
        }
    
        array.push({
            figure: values[1],
            state: result
        })
    });

    const total =array.reduce((p, c) => p += c.figure + c.state , 0 );
    console.log(total);
    const array2 = []
    input.split('\n').forEach((x) => {
        const values = x.split(' ');
        values[0] = values[0] == 'A' ? 1 : values[0] == 'B' ? 2 : 3; 
        let result = values[1] == 'X' ? 0 : values[1] == 'Y' ? 3 : 6;
        let figure = 0;
        if(result == 3) {
            figure = values[0];
        } else if (result == 0) {
            figure = values[0] == 3 ? 2 : values[0] == 2 ? 1 : 3
        } else {
            figure = values[0] == 3 ? 1 : values[0] == 2 ? 3 : 2
        }
    
        array2.push({
            figure,
            state: result
        })
    });
    const total2 =array2.reduce((p, c) => p += c.figure + c.state , 0 );
    console.log(total2);
}


calculate();