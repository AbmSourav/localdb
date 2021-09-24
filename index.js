const fs = require( 'fs' );
const { searchByValue } = require('./src/resource/searchByValue');
const {localDbChunk} = require( './src/localDbChunk' );
const { search } = require('./src/resource/search');
const { update } = require('./src/resource/update');


const localDB = function() {
	const crud = {}

	crud.get = async () => {
		return await fs.promises.readFile(localDbChunk.file, 'utf8');
	}

	crud.set = async (newData = []) => {
		let oldData = await localDbChunk.getData();
		if (oldData != undefined) {
			oldData = JSON.parse( oldData );
		} else oldData = [];
		
		if (localDbChunk.errorCheck(newData).status) return localDbChunk.errorCheck.message;
		oldData.push( newData );
		
		await localDbChunk.writeFile(oldData).catch(err => err);
	}

	crud.remove = async (item = undefined) => {
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
		const result = await update(item, newData)
			.then(function(data) { return data })
			.catch(function(error) { return error });

		return result
	}

	crud.search = async (key, value, unique = true) => {
		const result = search(key, value, unique)
			.then(function(data) { return data })
			.catch(function(error) { return error });

		return result
	}

	crud.searchByValue = async (value, unique = false) => {
		const result = await searchByValue(value, unique)
			.then(function(data) { return data })
			.catch(function(error) { return error });

		return result
	}


	return crud;

}

exports.localDB = localDB;
