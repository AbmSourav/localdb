const { localDbChunk } = require("../localDbChunk");

async function remove(item) {
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
		if (getItem[itemKey[0]] == undefined) notFound.push("Not found in LocalDB...");

		if ( getItem[itemKey[0]] != undefined ) {
			if ( getItem[itemKey[0]] == item[itemKey[0]] ) {
				match.push(getItem)
			} else {
				dataMap.push(getItem)
			}
		} else {
			dataMap.push(getItem)
		}
	})

	if (notFound.length != 0 && match.length === 0)  return console.log(notFound[0]);
	if (match.length != 0) {
		return await localDbChunk.writeFile(dataMap).catch(function(error) { return error });
	} else console.error("Not found in LocalDB...");
}

exports.remove = remove
