/**
 * LocalDB
 * 
 * Run CRUD orerations on json file using APIs.
 * 
 * @package localDB
 * @author Keramot UL Islam [Abm Sourav]
 * @email <keramotul.islam@gmail.com>
 * @authorUrl https://abmsourav.com
 * @sourceCode https://github.com/AbmSourav/localdb
 * @version 1.4.0
 * 
 * Copyright (c) 2021 Keramot UL Islam
 */


const fs = require( 'fs' );
const { localDbChunk } = require( './src/localDbChunk' );
const { set } = require('./src/resource/set');
const { insert } = require('./src/resource/insert');
const { update } = require('./src/resource/update');
const { remove } = require('./src/resource/remove');
const { search } = require('./src/resource/search');
const { searchByValue } = require('./src/resource/searchByValue');

const localDB = function() {
	const crud = {}

	/**
	 * Get all data fro DB
	 * 
	 * @returns array
	 */
	crud.get = async () => {
		return await fs.promises.readFile(localDbChunk.file, 'utf8');
	}

	/**
	 * Add new item in DB
	 * 
	 * @param {object} newData - Key-value pair object
	 * 
	 * @returns void
	 */
	crud.set = async (newData) => {
		const result = await set(newData)
			.then(function(data) { return data })
			.catch(function(error) { return error });

		return result
	}

	/**
	 * Insert data in an Object
	 * 
	 * @param {object} find - Identify the object
	 * @param {object} newData - new property and value
	 * 
	 * @returns void
	 */
	 crud.insert = async (find, newData) => {
		const result = await insert(find, newData)
			.then(function(data) { return data })
			.catch(function(error) { return error });

		return result
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

	/**
	 * Search data from DB
	 * 
	 * @param {string} key Property of the object
	 * @param {string} value Value of the property
	 * @param {bool} unique - Find one or all
	 * 
	 * @returns object
	 */
	crud.search = async (key, value, unique = true) => {
		const result = search(key, value, unique)
			.then(function(data) { return data })
			.catch(function(error) { return error });

		return result
	}

	/**
	 * Search by value
	 * 
	 * @param {string} value - Property value
	 * @param {bool} unique Find one or all
	 * 
	 * @returns object
	 */
	crud.searchByValue = async (value, unique = false) => {
		const result = await searchByValue(value, unique)
			.then(function(data) { return data })
			.catch(function(error) { return error });

		return result
	}


	return crud;

}

exports.localDB = localDB;
