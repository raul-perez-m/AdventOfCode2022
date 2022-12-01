const { readFileSync } = require('fs');
const  path = require('path')

const input = readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');



function CalculateTop3(top3, value){
    for(let i = 0; i <= 2; i += 1){
        if(top3[i] < value){
            const val = top3[i];
            top3[i] = value;
            CalculateTop3(top3, val);
            break;
        }
    }
}

function calculateCalories(){

    const data = input.split('\n').map(Number);
    let mostCalories = 0;
    const top3 = [0, 0 ,0]; 
    data.reduce((p,c) => {
        if(c == 0) p.push(0);
        else p[p.length - 1] += c;
        mostCalories = mostCalories <= p[p.length - 1] ?  p[p.length - 1] : mostCalories;
        CalculateTop3(top3, p[p.length - 1]);
        return p;
    }, []);
    console.log(`Part 1: ${mostCalories}`);

    console.log(`Part 2: ${top3.reduce((p, c) => p += c, 0)}`);

}


calculateCalories();