const { readFileSync } = require('fs');
const  path = require('path')
const input = readFileSync(path.join(__dirname, 'input.txt'), 'utf-8').split('\n').map(x => x.split('').map(Number));

const getColumns = (arr,n) => arr.map((x) => x[n]);

function isVisible(input, idx, value) {
    const left = [...input];
    const right = left.splice(idx, input.length );
    right.splice(0, 1);
    const sortLeft = Math.max(...left)
    const sortRight = Math.max(...right) 
    return sortLeft < value || sortRight < value 
}

function calculateScenicValue(arr, value){
    let total = 0;
    for(let i = 0; i < arr.length; i += 1)
    {
        total += 1;
        if(arr[i] >= value) break;
    }
    return total;
}

function getScenicValue(input, idx, value) {
    const left = [...input];
    const right = left.splice(idx, input.length );
    left.reverse();
    right.splice(0, 1);

    const maxRight = calculateScenicValue(right, value);
    const maxLeft = calculateScenicValue(left, value);
    return maxRight*maxLeft;
}

function calculate(){
    let scenicValue = 0
    const a = input.reduce((prev, curr, i) => {
        prev += curr.reduce((p,c,idx) => {
            const column = getColumns(input, idx);
            const isVisibl = isVisible(curr, idx, c) || isVisible(column,i, c);
            if(!(idx == 0 || idx == curr.length  || i == 0 || i == input.length))
            {
                const value = getScenicValue(curr, idx, c) * getScenicValue(column,i, c);
                scenicValue = scenicValue < value ? value : scenicValue;
            }
            p +=  isVisibl ? 1 : 0;
            return p;
        }, 0);
        return prev;
    }, 0)

    console.log(`Visible tree -> ${a}`);
    console.log(`Highest scenic value -> ${scenicValue}`);
}

calculate();