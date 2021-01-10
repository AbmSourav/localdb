const path = require( 'path' );
const fs = require( 'fs' );

const localDbChunk = {
	file: path.resolve(path.dirname(__dirname), './localdb.json'),

	getData: () => {
		const getData = fs.readFileSync( localDbChunk.file, 'utf8' );
		if (getData.length == 0) return undefined;
		return getData;
	},

	writeFile: async (data) => {
		await fs.promises.writeFile(localDbChunk.file, JSON.stringify(data, null, 2));
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
