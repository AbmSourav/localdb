const fs = require( 'fs' );
const {localDbChunk} = require( './src/localDbChunk' );


const localDB = function() {
	const crud = {}

	crud.get = () => {
		const getData = fs.readFileSync( localDbChunk.file, 'utf8' );
		if (getData.length == 0) return undefined;
		return getData;
	}

	crud.addNew = (newData = []) => {
		let oldData = crud.get();
		if (oldData != undefined) {
			oldData = JSON.parse( oldData );
		} else oldData = [];
		
		if (localDbChunk.errorCheck(newData).status) return localDbChunk.errorCheck.message;
		oldData.push( newData );
		
		localDbChunk.writeFile(oldData);
	}

	crud.del = (item = undefined) => {
		if (localDbChunk.errorCheck(item).status) return localDbChunk.errorCheck.message;

		const itemKey = Object.keys(item);

		let getAllData = crud.get();
		if (getAllData == undefined) {
			return console.error("LocalDB is empty...");
		}
		getAllData = JSON.parse( getAllData );

		const notFound = [];
		const dataMap = [];
		const match = [];
		getAllData.filter(function(getItem) {
			if (getItem[itemKey[0]] == undefined) return notFound.push("Not found in LocalDB...");

			if ( getItem[itemKey[0]] != undefined ) {
				if ( getItem[itemKey[0]] == item[itemKey[0]] ) {
					match.push(getItem);
				}

				if (getItem[itemKey[0]] != item[itemKey[0]]) {
					dataMap.push(getItem);
				}
			}
		})

		if (notFound.length != 0)  return console.log(notFound[0]);
		if (match.length != 0) {
			localDbChunk.writeFile(dataMap);
		} else console.error("Not found in LocalDB...");
	}

	crud.update = (item = undefined, newData = undefined) => {
		if (localDbChunk.errorCheck(item).status) return localDbChunk.errorCheck.message;

		const itemKey = Object.keys(item);

		let getAllData = crud.get();
		if (getAllData == undefined) {
			return console.error("LocalDB is empty...");
		}
		getAllData = JSON.parse( getAllData );

		const notFound = [];
		const dataMap = [];
		const match = [];
		getAllData.filter(function(getItem) {
			if (getItem[itemKey[0]] == undefined) return notFound.push("Not found in LocalDB...");

			if ( getItem[itemKey[0]] != undefined ) {
				if ( getItem[itemKey[0]] == item[itemKey[0]] ) {
					match.push(getItem);
					getItem[itemKey[0]] = newData;
				}
			}
			return dataMap.push(getItem);
		})

		if (notFound.length != 0) return console.error(notFound[0]);
		if (match.length != 0) {
			return localDbChunk.writeFile(dataMap);
		} else return console.error("Not found in LocalDB...");
	}


	return crud;

}

exports.localDB = localDB;
