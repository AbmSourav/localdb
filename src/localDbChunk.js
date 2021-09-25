const path = require( 'path' );
const fs = require( 'fs' );

const localDbChunk = {

	writeFile: async (data, filePath = null) => {
		const file = filePath == null ? path.resolve(path.dirname(__dirname), './localdb.json') : filePath;

        const writeStream = fs.createWriteStream(file);
        
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
