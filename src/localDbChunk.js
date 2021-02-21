const path = require( 'path' );
const fs = require( 'fs' );

const localDbChunk = {
	file: path.resolve(path.dirname(__dirname), './localdb.json'),

	getData: () => {
		return new Promise((resolve, reject) => {
            let data = '';
            fs.createReadStream(localDbChunk.file)
                .on('data', (chunk) =>  data += chunk)
                .on('end', () => resolve(data))
                .on('error', error => reject(error));
        });
	},

	writeFile: async (data) => {
        const writeStream = fs.createWriteStream(localDbChunk.file);
        
        writeStream
            .on('error', (error) => {
                console.log(error);
            })
            .write(JSON.stringify(data, null, 4));
	},

	errorCheck: (data) => {
		if (data == undefined) {
			return {
				status: true, 
				message: console.error(undefined)
			}
		}

		if (typeof(data) != 'object') {
			return {
				status: true, 
				message: console.error("Valid Json object required...")
			}
		}

		return { status: false }
	}
}

exports.localDbChunk = localDbChunk;
