/*
dbHandler.js
Author: Kirill Volodkin
Created date: 2019-12-03

This script creates and supports dbHandler class. This class is responsible for reading from and writing into a json datafile. 
*/

const fs = require("fs");

class dbHandler {
    constructor(path) {
        this.dbPath = path;
    }

    read(){
        let output = fs.readFileSync(this.dbPath, 'utf8')
        return output;
    }

    write(data){
        fs.writeFile(this.dbPath, data, function(err, data){
            if (err) throw err;
            console.log("File write successful")
        })
    }
}

module.exports.dbHandler = dbHandler;



