const {localDB} = require("./index");
// const {localDbChunk} = require( './src/localDbChunk' );

const ldb = localDB();

// const data = {name: "Sourav", email: "keramotul.islam@gmail.com"};

// setTimeout(function() {
// 	ldb.addNew(data)
// 		.catch( (err) => console.log(err) );
// }, 500)

// ldb.get()
// 	.then( (data) => console.log(data) )
// 	.catch( (err) => console.log(err) );

// ldb.del({name: "Keramot UL Islam"})
// 	.catch( err => console.log(err) );

ldb.update({name: "Sourav"}, "Abm Sourav")
