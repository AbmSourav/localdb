const { localDbChunk } = require("../localDbChunk");

async function searchByValue (value, unique) {
	let getAllData = await localDbChunk.getData();
	if (getAllData == undefined) {
		console.error("LocalDB is empty...");
		return null
	}

	const dataChunk = []
	getAllData = JSON.parse( getAllData );
	for (let i = 0; i < getAllData.length; i++) {
		let data = getAllData[i]

		for (let item in data) {
			if (data[item] === value) {
				if (unique) return data;
				dataChunk.push(data)
			}	
		}
	}
	
	if (dataChunk.length === 0) return undefined
	return dataChunk;
}

exports.searchByValue = searchByValue
