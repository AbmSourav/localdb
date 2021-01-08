const {localDB} = require("./index");
const {chunk} = require( './src/chunk' );

const ldb = localDB();

const data = {name: "Keramot", email: "sourav@gmail.com"};
// console.log( ldb.get() );
// ldb.addNew(data);
// ldb.del({"name": "Keramot"});
// console.log(chunk.file);
