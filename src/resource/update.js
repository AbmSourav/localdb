const { localDbChunk } = require("../localDbChunk");

async function update(item, newData) {
	if (localDbChunk.errorCheck(item).status) return localDbChunk.errorCheck.message;

	const itemKey = Object.keys(item);
	// console.log(itemKey[0])

	let getAllData = localDbChunk.getData();
	if (getAllData == undefined) {
		return console.error("LocalDB is empty...");
	}
	getAllData = JSON.parse( getAllData );

	const notFound = [];
	const dataMap = [];
	const match = [];
	getAllData.filter(function(getItem) {
		if (getItem[itemKey[0]] === undefined) notFound.push("Not found in LocalDB...");

		if ( getItem[itemKey[0]] != undefined ) {
			if ( getItem[itemKey[0]] == item[itemKey[0]] ) {
				match.push(getItem);
				getItem[itemKey[0]] = newData;
			}
		}
		dataMap.push(getItem);
	})

	if (notFound.length != 0 && match.length === 0) return console.error(notFound[0]);
	if (match.length != 0) {
		return await localDbChunk.writeFile(dataMap);
	} else return console.error("Not found in LocalDB...");
}

exports.update = update
