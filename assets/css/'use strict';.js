'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}


/*
 * Complete the 'compareStrings' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING firstString
 *  2. STRING secondString
 *  3. STRING thirdString
 */

function compareStrings(firstString, secondString, thirdString) {
    let allstr = [firstString, secondString, thirdString];
    let str = "";

    allstr.sort(function (a, b) {
        return a.length - b.length;
    });
    
    for(let i = 0; i < allstr.length; i++) {
        str += allstr[i];
    }
    
    console.log(str);
}
function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstString = readLine();

    const secondString = readLine();

    const thirdString = readLine();

    const result = compareStrings(firstString, secondString, thirdString);

    ws.write(result + '\n');

    ws.end();
}