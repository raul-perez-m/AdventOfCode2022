const { readFileSync } = require('fs');
const  path = require('path')

const input = readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

function calculate(){
    const data = input.split('\n').map(x => x.split(''));
    const equals = []
    let group = []
    const groups = []
    data.forEach((line, i) => {
        const copy = [...line];
        const part = line.splice(0, line.length/2);
        part.some(x => {
            if (line.includes(x)) {
                equals.push(x);
                return true;
            }else
                return false;
        });

        group.push(copy);
        if(i%3 === 2){
            groups.push(group);
            group = [];
        }
    })

    const badges = []
    groups.forEach((group) => {
        group[0].some(char => {
            if(group[1].includes(char) && group[2].includes(char)){
                badges.push(char);
                return true;
            }
            return false;
        });
    });

    console.log(groups);
    const result = equals.reduce((p, c) => p += letters.indexOf(c) + 1, 0)
    console.log(`result = ${result}`);
    const result2 = badges.reduce((p, c) => p += letters.indexOf(c) + 1, 0)
    console.log(`result2 = ${result2}`);

}

calculate();