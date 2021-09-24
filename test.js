const {localDB} = require("./index");
// const {localDbChunk} = require( './src/localDbChunk' );

const ldb = localDB();

const data = {name: "Sourav", email: "keramotul.islam@gmail.com"};

// setTimeout(function() {
	// ldb.set(data)
	// 	.catch( (err) => console.log(err) );
// }, 500)

// ldb.get()
// 	.then( (data) => console.log(data) )
// 	.catch( (err) => console.log(err) );

// ldb.remove({name: "Sourav"})
// 	.catch( err => console.log(err) );

ldb.update({age: 31}, 29)

// ldb.search("name", "Sourav").then( data => console.log(data) );

// ldb.searchByValue("Sourav").then( data => console.log(data) );
