const { readFileSync } = require('fs');
const  path = require('path')

const input = readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

function checkString(str) {
    // set size returns the size with the non repeated characters
    return new Set(str).size == str.length;
}

function calculateIndex(input, lenght){
    for(let i = 0; i < input.length; i += 1){
        const slice = input.substring(i, i + lenght,)
        if (checkString(slice)){
            return i;
        }
    }   
}

function calculate(){
    console.log(calculateIndex(input, 4) + 4)
    console.log(calculateIndex(input, 14) + 14)
}

calculate();