const fs = require( 'fs' );
const {localDbChunk} = require( './src/localDbChunk' );


const localDB = function() {
	const crud = {}

	crud.get = async () => {
		return await fs.promises.readFile(localDbChunk.file, 'utf8');
	}

	crud.set = async (newData = []) => {
		return new Promise((resolve, reject) => {
            if (localDbChunk.errorCheck(newData).status) return reject(localDbChunk.errorCheck.message);

            crud.get()
                .then( (data) => {

                    if (data == undefined) {
                        data = [];
                        data.push(newData);
                        resolve(localDbChunk.writeFile(data));
                    } else if (typeof JSON.parse(data) === "string") {
                        reject("LocalDB don't have a valid Json data type, remove all invalid data first.");
                    } else {
                        let parsedData = JSON.parse(data);
                        parsedData.push(newData);
                        resolve(localDbChunk.writeFile(parsedData));
                    }
                } )
                .catch(error => reject(error));
        });
	}

	crud.remove = async (item = undefined) => {
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
                            }
    
                            if (getItem[itemKey[0]] != item[itemKey[0]]) {
                                dataMap.push(getItem);
                            }
                        } else {
                            dataMap.push(getItem);
                        }
                    })
    
                    if (notFound.length == getAllData.length)  return reject(notFound[0]);
                    if (match.length != 0) {
                        resolve(localDbChunk.writeFile(dataMap) );
                    } else reject("Not found in LocalDB...");
                } )
                .catch(error => reject(error));
        });
	}

	crud.update = async (item = undefined, newData = undefined) => {
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
                                getItem[itemKey[0]] = newData;
                            }
                        }
                        return dataMap.push(getItem);
                    })
    
                    if (notFound.length == getAllData.length) return reject(notFound[0]);
                    if (match.length != 0) {
                        resolve(localDbChunk.writeFile(dataMap));
                    } else reject("Not found in LocalDB...");
                } )
                .catch(error => reject(error));
        });
	}


	return crud;

}

exports.localDB = localDB;
