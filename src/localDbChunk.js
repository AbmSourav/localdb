const path = require( 'path' );
const fs = require( 'fs' );

const localDbChunk = {
	file: path.resolve(path.dirname(__dirname), './localdb.json'),

	writeFile: (data) => {
		fs.writeFile(
			localDbChunk.file,
			JSON.stringify(data, null, 2),
			(err) => {
				if (err) throw console.error(err);
				console.log("Done");
			}
		);
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
