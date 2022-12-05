const { readFileSync } = require('fs');
const  path = require('path')

const input = readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

const crates = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: []
}

let crates2 = {}

function moveCrate(k, from, to){
    for(let i = 0; i < k; i +=1)
    {
        const moving = crates[from].shift()
        crates[to].unshift(moving);
    }
}

function moveCrateMultiple(k, from, to){
    const moving = crates2[from].splice(0, k);
    crates2[to].unshift(...moving);
    
}

function calculate(){
    const data = input.split('\n');
    const plane = data.splice(0, 9);
    console.log(plane);
    plane.pop();
    const lines = []
    plane.forEach((line) => {
        let spaces = 0;
        let fixedLine = [];
        line.split(' ').forEach(x => {
            if(!x) {
                spaces += 1;
                if(spaces === 4){
                    fixedLine.push('[]');
                    spaces = 0;
                }
            }
            else fixedLine.push(x);
        })
        lines.push(fixedLine);
    });

    lines.forEach((l) => {
        l.forEach((x,idx) => x !== '[]' ? crates[idx + 1].push(x) : '')
    })
    crates2 = structuredClone(crates);
    data.filter(x => x).forEach(line => {
        const move = line.split(' ').filter(Number).map(Number);
        moveCrateMultiple(move[0], move[1], move[2])
        moveCrate(move[0], move[1], move[2])
    });

    const output = Object.values(crates).reduce((p,c) => p += c[0], '')
    const output2 = Object.values(crates2).reduce((p,c) => p += c[0], '')
    console.log(output)
    console.log(output2)
 
}

calculate();