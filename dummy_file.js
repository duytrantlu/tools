const fs = require('fs');
const PDFDocument = require('pdfkit');
const {includes, isNumber} = require('lodash');

const myArgs = process.argv.slice(2);

const formatSize = ['KB', 'MB', 'G'];
const reg = /(kb|mb|g)/;

const capacity = parseInt(myArgs[1]);
let data = Buffer.alloc(0);
if(isNumber(capacity)) {

    const sizeType = myArgs[1].match(reg);
    if(sizeType && includes(formatSize, sizeType[1].toLocaleUpperCase())) {
        switch (sizeType[1].toLocaleUpperCase()) {
            case formatSize[0]:
                data =  Buffer.alloc(1024*capacity, 'dummy data');
                break;
                case formatSize[1]:
                    data =  Buffer.alloc(1024*1024*capacity, 'dummy data');
                    break;
                case formatSize[2]:
                    data =  Buffer.alloc(1024*1024*1024*capacity, 'dummy data');
                    break;
                default:
                    console.log('The format of size is not supported!');
                    break;
        }
    } else {
        console.log('Make sure format size is corrected!');
    }
    
}

switch (myArgs[0]) {
    case 'pdf':
        // create a document and pipe to a blob
        var doc = new PDFDocument();
        doc.pipe(fs.createWriteStream('output.pdf'));

        // draw some text
        doc.fontSize(25).text(data.toString(), 100, 100);

        // end and display the document in the iframe to the right
        doc.end();
        console.log('The pdf file has been saved!');
        break;
    case 'txt':
        fs.writeFile('file.txt',data.toString(), err => {
            if (err) throw err;
          console.log('The txt file has been saved!');
        });
        break;
    default:
        console.log('Please pass format txt|pdf');
        break;
}






