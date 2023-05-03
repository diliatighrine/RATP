var file_name = 'stops.txt';
var name = 'stops';

var readline = require('readline');
var fs = require('fs');

var lineReader = readline.createInterface({
    input: fs.createReadStream(file_name),
    // input: fs.createReadStream(file_name1)
});

var isHeader = false;
var columnNames = [];

function parseLine(line) {
    return line.trim().split(',')
}

function createRowObject(values) {
    var rowObject = {};

    columnNames.forEach((value,index) => {
        rowObject[value] = values[index];
    });

    return rowObject;
}

var json = {};
json[name] = [];
// json[file_name1] = [];
lineReader.on('line', function (line) {
    if(!isHeader) {
        columnNames = parseLine(line);
        isHeader = true;
    } else {
        json[name].push(createRowObject(parseLine(line)));
        // json[file_name1].push(createRowObject(parseLine(line)));
    }
});
// document.write("Hello")

lineReader.on('close', function () {
    fs.writeFileSync(name +'.json', JSON.stringify(json,null,2));
    // fs.writeFileSync(file_name1 + '.json', JSON.stringify(json,null,2));
});