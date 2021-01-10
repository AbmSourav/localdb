const fs = require( 'fs' );
const {localDbChunk} = require( './src/localDbChunk' );


const localDB = function() {
	const crud = {}

	crud.get = async () => {
		return await fs.promises.readFile(localDbChunk.file, 'utf8');
	}

	crud.addNew = async (newData = []) => {
		let oldData = await localDbChunk.getData();
		if (oldData != undefined) {
			oldData = JSON.parse( oldData );
		} else oldData = [];
		
		if (localDbChunk.errorCheck(newData).status) return localDbChunk.errorCheck.message;
		oldData.push( newData );
		
		await localDbChunk.writeFile(oldData).catch(err => err);
	}

	crud.del = async (item = undefined) => {
		if (localDbChunk.errorCheck(item).status) return localDbChunk.errorCheck.message;

		const itemKey = Object.keys(item);

		let getAllData = await localDbChunk.getData();
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
			await localDbChunk.writeFile(dataMap).catch(err => err);
		} else console.error("Not found in LocalDB...");
	}

	crud.update = async (item = undefined, newData = undefined) => {
		if (localDbChunk.errorCheck(item).status) return localDbChunk.errorCheck.message;

		const itemKey = Object.keys(item);

		let getAllData = localDbChunk.getData();
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
			return await localDbChunk.writeFile(dataMap);
		} else return console.error("Not found in LocalDB...");
	}


	return crud;

}

exports.localDB = localDB;
