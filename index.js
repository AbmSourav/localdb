const fs = require( 'fs' );
const { searchByValue } = require('./src/resource/searchByValue');
const {localDbChunk} = require( './src/localDbChunk' );
const { search } = require('./src/resource/search');
const { update } = require('./src/resource/update');
const { remove } = require('./src/resource/remove');


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

	/**
	 * Remove data from DB
	 * 
	 * @param {object} item - Identify the object with key-value pair
	 * 
	 * @returns void
	 */
	crud.remove = async (item) => {
		const result = await remove(item)
			.then(function(data) { return data })
			.catch(function(error) { return error });

		return result
	}

	/**
	 * Update data on DB
	 * 
	 * @param {object} find - Identify the object
	 * @param {object} newData - property that need to be change and it's new value
	 * 
	 * @returns void
	 */
	crud.update = async (find, newData) => {
		const result = await update(find, newData)
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
