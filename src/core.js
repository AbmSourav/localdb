const path = require( 'path' );
const fs = require( 'fs' );

const coreModules = {
	file: path.dirname(__dirname) + '/localdb.json',

	writeFile: (data) => {
		fs.writeFile(
			coreModules.file,
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
	},

	search: (data, item) => {
		function(getItem) {
			if (getItem[itemKey[0]] == undefined) return notFound.push("Not found in LocalDB...");
			// console.log(getItem[itemKey[0]]);

			if ( getItem[itemKey[0]] != undefined ) {
				if ( getItem[itemKey[0]] == item[itemKey[0]] ) {
					match.push(getItem);
				}

				if (getItem[itemKey[0]] != item[itemKey[0]]) {
					dataMap.push(getItem);
				}
			}
		}
	}
}

exports.coreModules = coreModules;
