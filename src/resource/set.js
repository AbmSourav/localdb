const { localDbChunk } = require("../localDbChunk");

async function set(newData) {
	if (localDbChunk.errorCheck(newData).status) return localDbChunk.errorCheck.message;

	let oldData = []
	oldData = await localDbChunk.getData();

	if (oldData != undefined) {
		oldData = JSON.parse( oldData );
	}
	oldData.push( newData );
	
	return await localDbChunk.writeFile(oldData).catch(function(error) { return error });
}

exports.set = set
