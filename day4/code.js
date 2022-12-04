const { readFileSync } = require('fs');
const  path = require('path')

const input = readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');



function inRange(range, rangeVal) {
    return (rangeVal[0] >= range[0] && rangeVal[0] <= range[1]  && rangeVal[1] >= range[0] && rangeVal[1] <= range[1]) ||
    range[0] >= rangeVal[0] && range[0] <= rangeVal[1]  && range[1] >= rangeVal[0] && range[1] <= rangeVal[1]
}

function overlaps(range, rangeVal) {
    return rangeVal[0] >= range[0] && rangeVal[0] <= range[1]  
        || rangeVal[1] >= range[0] && rangeVal[1] <= range[1] 
        || range[0] >= rangeVal[0] && range[0] <= rangeVal[1]  
        || range[1] >= rangeVal[0] && range[1] <= rangeVal[1]
}

function calculate(){
    const data = input.split('\n').map(x => x.split(',')).flat().map(x =>[...(x.split('-'))].map(Number));
    let times = 0;
    let overlapsCount = 0;
    for(let i = 0; i < data.length; i += 2)
    {
        times = inRange(data[i], data[i+1]) ? times + 1: times;
        overlapsCount = overlaps(data[i], data[i+1]) ? overlapsCount +1 : overlapsCount;
    }
    console.log(times);
    console.log(overlapsCount);

}

calculate();