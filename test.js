const fs = require( 'fs' );
const {localDB} = require("./index");

const ldb = localDB('./test.json');

// ldb.update( {"name": "Abm Sourav"}, "ABM Sourav" );

// ldb.update({"greetings": "Hello Universe"}, "Hello Universe...");

// ldb.remove({name: "ABM Sourav.."});

// ldb.set({"email": "keramotul.islam@gmail.com"})
// 	.then(() => ldb.update({"greetings": "Hello Universe"}, "Hello World"))
// 	.then( () =>  ldb.remove({"name": "ABM Sourav"}))
// .then( () =>  ldb.get().then(data => console.log(data)));
