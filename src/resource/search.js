const { localDbChunk } = require("../localDbChunk");

async function search(key, value, unique) {
	if (typeof key != "string") {
		console.error("Key must be a String type")
		return undefined
	}

	let getAllData = await localDbChunk.getData();
	if (getAllData == undefined) {
		console.error("LocalDB is empty...");
		return null
	}

	const data = []
	getAllData = JSON.parse( getAllData );
	for (let i = 0; i < getAllData.length; i++) {
		const item = getAllData[i];
		
		if (item[key] != undefined && item[key] === value) {
			if (unique) return item;
			data.push(item)
		}
	}

	if (data.length === 0) return undefined
	return data;
}

exports.search = search
