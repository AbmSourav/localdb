const {localDB} = require("./index");
const {coreModules} = require( './src/core' );

const ldb = localDB();

const data = {name: "AbmSourav", email: "keramotul.islam@gmail.com"};
// console.log( ldb.get() );
// ldb.addNew(data);
ldb.del({"name": "AbmSourav"});
// console.log(coreModules.file);
