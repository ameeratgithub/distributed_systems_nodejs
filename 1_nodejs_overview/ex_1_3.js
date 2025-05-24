
import fs from "fs";

fs.readFile('./ex_1_3.js', (err, data) => {
    if (err) {
        throw err;
    }
    console.log(data);
})

setImmediate(() => {
    console.log('This runs while file being read');
})