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
 * @version 1.5.2
 * 
 * Copyright (c) 2021 Keramot UL Islam
 */


const fs = require( 'fs' );
const path = require( 'path' );
const { localDbChunk } = require('./src/localDbChunk');

const localDB = function(filePath = null) {
	const crud = {}

	let file = filePath === null ? path.join(__dirname, '/localdb.json') : filePath;

	/**
	 * Get all data fro DB
	 * 
	 * @returns array
	 */
	crud.get = async () => {
		return await fs.promises.readFile(file, 'utf8');
	}

	/**
	 * Add new item in DB
	 * 
	 * @param {object} newData - Key-value pair object
	 * 
	 * @returns void
	 */
	 crud.set = async (newData) => {
		return new Promise((resolve, reject) => {
            if (localDbChunk.errorCheck(newData).status) return reject(localDbChunk.errorCheck.message);

            crud.get()
                .then( (data) => {
					if (data.length == 0 || data.length == 1 || data.length == 2) {
                        data = [];
						data.push(newData);
                        resolve(localDbChunk.writeFile(data, file));
                    } else if (typeof JSON.parse(data) === "string") {
                        reject("LocalDB don't have a valid Json data type, remove all invalid data first.");
                    } else {
                        let parsedData = JSON.parse(data);
                        parsedData.push(newData);
                        resolve(localDbChunk.writeFile(parsedData, file));
                    }
                } )
                .catch(error => reject(error));
        });
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
		return new Promise((resolve, reject) => {
            if (localDbChunk.errorCheck(find).status) return localDbChunk.errorCheck.message;
			if (localDbChunk.errorCheck(newData).status) return localDbChunk.errorCheck.message;

			const itemKey = Object.keys(find);
			const newDataKey = Object.keys(newData);

            crud.get()
                .then( (data) => {
					if (data.length == 0 || data.length == 1 || data.length == 2) {
                        return reject("LocalDB is empty...");
                    }
                    getAllData = JSON.parse(data);

					const notFound = [];
					const dataMap = [];
					const match = [];
					getAllData.filter(function(getItem) {
						if (getItem[itemKey[0]] === undefined) notFound.push("Not found in LocalDB...");

						if ( getItem[itemKey[0]] != undefined ) {
							if ( getItem[itemKey[0]] === find[itemKey[0]] ) {
								if (getItem[newDataKey[0]] === undefined ) {
									match.push(getItem);
									getItem[newDataKey[0]] = newData[newDataKey[0]];
								} else {
									notFound.push("Data already exist in LocalDB...");
								}
							}
						}
						dataMap.push(getItem);
					})

					if (notFound.length != 0 && match.length === 0) return console.error(notFound[0]);
					if (match.length != 0) {
						resolve(localDbChunk.writeFile(dataMap, file) );
					} else reject("Not found in LocalDB...");
                } )
                .catch(error => reject(error));
        });
	}

	/**
	 * Remove data from DB
	 * 
	 * @param {object} item - Identify the object with key-value pair
	 * 
	 * @returns void
	 */
	crud.remove = async (item) => {
		return new Promise((resolve, reject) => {
            if (localDbChunk.errorCheck(item).status) return reject(localDbChunk.errorCheck.message);

            const itemKey = Object.keys(item);
            crud.get()
                .then( (data) => {
                    if (data.length == 0 || data.length == 1 || data.length == 2) {
                        return reject("LocalDB is empty...");
                    }
                    getAllData = JSON.parse(data);

                    const notFound = [];
                    const dataMap = [];
                    const match = [];
                    getAllData.filter(function(getItem) {
                        if (getItem[itemKey[0]] == undefined) notFound.push("Not found in LocalDB...");
    
                        if ( getItem[itemKey[0]] != undefined ) {
                            if ( getItem[itemKey[0]] == item[itemKey[0]] ) {
                                match.push(getItem);
                            } else {
                                dataMap.push(getItem);
                            }
                        } else {
                            dataMap.push(getItem);
                        }
                    })
    
                    if (notFound.length == getAllData.length)  return reject(notFound[0]);
                    if (match.length != 0) {
                        resolve(localDbChunk.writeFile(dataMap, file) );
                    } else reject("Not found in LocalDB...");
                } )
                .catch(error => reject(error));
        });
	}

	/**
	 * Update data on DB
	 * 
	 * @param {object} find - Identify the object
	 * @param {object} newData - property that need to be change and it's new value
	 * 
	 * @returns void
	 */
	crud.update = async (item, newData) => {
		return new Promise((resolve, reject) => {
            if (localDbChunk.errorCheck(item).status) return reject(localDbChunk.errorCheck.message);
			if (localDbChunk.errorCheck(newData).status) return reject(localDbChunk.errorCheck.message);

			const itemKey = Object.keys(item);
			const newDataKey = Object.keys(newData);
    
            crud.get()
                .then( (data) => {
                    if (data.length == 0 || data.length == 1 || data.length == 2) {
                        return reject("LocalDB is empty...");
                    }
                    getAllData = JSON.parse(data);
    
                    const notFound = [];
                    const dataMap = [];
                    const match = [];
                    getAllData.filter(function(getItem) {
                        if (getItem[itemKey[0]] == undefined) notFound.push("Not found in LocalDB...");
    
                        if ( getItem[itemKey[0]] != undefined ) {
                            if ( getItem[itemKey[0]] == item[itemKey[0]] ) {
                                match.push(getItem);
                                getItem[itemKey[0]] = newData[newDataKey[0]];
                            }
                        }
                        dataMap.push(getItem);
                    })
    
                    if (notFound.length != 0  && match.length === 0) return reject(notFound[0]);
                    if (match.length != 0) {
                        resolve(localDbChunk.writeFile(dataMap, file));
                    } else reject("Not found in LocalDB...");
                } )
                .catch(error => reject(error));
        });
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
		return new Promise((resolve, reject) => {
			if (typeof key != "string") {
				console.error("Key must be a String type")
				reject(undefined)
			}
			if (typeof value != "string") {
				console.error("Value must be a String type")
				reject(undefined)
			}
		
			crud.get()
				.then( (data) => {
					if (data.length == 0 || data.length == 1 || data.length == 2) {
						return reject("LocalDB is empty...");
					}
					getAllData = JSON.parse(data);
					const searchData = []

					for (let i = 0; i < getAllData.length; i++) {
						const item = getAllData[i];
						
						if (item[key] != undefined && item[key] === value) {
							if (unique) resolve(item);
							searchData.push(item)
						}
					}
				
					if (searchData.length === 0) reject(undefined);
					resolve(searchData);
			});
		});
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
		return new Promise((resolve, reject) => {
			if (typeof value != "string") {
				console.error("Value must be a String type")
				reject(undefined)
			}
		
			crud.get()
				.then( (data) => {
					if (data.length == 0 || data.length == 1 || data.length == 2) {
						return reject("LocalDB is empty...");
					}
					getAllData = JSON.parse(data);
					const dataChunk = []

					for (let i = 0; i < getAllData.length; i++) {
						let data = getAllData[i]
				
						for (let item in data) {
							if (data[item] === value) {
								if (unique) resolve(data);
								dataChunk.push(data)
							}	
						}
					}
					
					if (dataChunk.length === 0) return undefined
					resolve(dataChunk);
			});
		});
	}


	return crud;

}

exports.localDB = localDB;
