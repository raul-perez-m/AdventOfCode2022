const { readFileSync } = require('fs');
const  path = require('path')

const input = readFileSync(path.join(__dirname, 'input.txt'), 'utf-8').split('\n').map(x => 
    x.split(' '));

const directory ={
    '/': {}
}
let currentDirectory = directory['/'];
let lastDirectoryList = []; 
function executeCd(command) {
    switch ( command){
        case '/':
            currentDirectory =  directory['/'];
            lastDirectoryList = [];
            break;
        case '..':
            currentDirectory = lastDirectoryList.pop();
            break;
        default:
            lastDirectoryList.push(currentDirectory);
            currentDirectory[command] = currentDirectory[command] ?? {};
            currentDirectory = currentDirectory[command];
            break;
    }
}

function executeCommand(command){
    if(command[1] != 'cd')
        return;
    executeCd(command[2]);
}

let response = [];

// function calculateSize(dir, space) {
//     let size = 0;
//     Object.values(dir).forEach( x => {
//         if(typeof x == 'object'){
//             size += calculateSize(x, space);
//         }else {
//              size += x;
//         }
//     });
//     if(size && size < space)
//         response.push(size);
//     return size;
// }


function calculateSize(dir, operation) {
    let size = 0;
    Object.values(dir).forEach( x => {
        size += typeof x == 'object' ? calculateSize(x, operation) : x;
    });
    if(size && operation(size))
        response.push(size);
    return size;
}

function calculate(){
    input.forEach(x => {

        if(x[0] == '$') {
            executeCommand(x)
        }else if(x[0] == 'dir'){
            currentDirectory[x[1]] = {}
        }else{
            currentDirectory[x[1]] = parseInt(x[0]);
        }
    });

    let size = calculateSize(directory, (x) => x < 100000 );
    console.log(`Sum of directories with size lower than 100000 -> ${response.reduce((p,c) => p += c, 0)}`);
    
    let spaceLeft = 70000000 - size;
    console.log(`Space left -> ${spaceLeft}`);
    let spaceNeeded = 30000000 - spaceLeft;
    console.log(`Space needed -> ${spaceNeeded}`);

    response = [];
    calculateSize(directory, (x) => x >= spaceNeeded);
    console.log(`Size of directory to delete -> ${Math.min(...response)}`);
}

calculate();