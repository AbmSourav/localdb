const fs = require( 'fs' );
const {coreModules} = require( './src/core' );


const localDB = function() {
	const crud = {}

	crud.get = () => {
		const getData = fs.readFileSync( coreModules.file, 'utf8' );
		if (getData.length == 0) return undefined;
		return getData;
	}

	crud.addNew = (newData = []) => {
		let oldData = crud.get();
		if (oldData != undefined) {
			oldData = JSON.parse( oldData );
		} else oldData = [];
		
		if (coreModules.errorCheck(newData).status) return coreModules.errorCheck.message;
		oldData.push( newData );
		
		coreModules.writeFile(oldData);
	}

	crud.del = (item = undefined) => {
		if (coreModules.errorCheck(item).status) return coreModules.errorCheck.message;

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
			// console.log(getItem[itemKey[0]]);

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
			coreModules.writeFile(dataMap);
		} else console.error("Not found in LocalDB...");
	}

	crud.update = '';


	return crud;

}

exports.localDB = localDB;
