# LocalDB
LocalDB is a NodeJS CRUD api. It uses local file system for CRUD operation.

<br>
<br>

## API

**GET** `localDB.get()`

**POST** `localDB.addNew(jsonObject)`

**UPDATE** `localDB.update(jsonObject)`

**DELETE** `localDB.del(jsonObject)`

<br>

## Uses
```js
const {localDB} = require('@abmsourav/localdb');
const db = localDB();

const data = {names: "Sourav", email: "keramotul.islam@gmail.com"};

// add new data
ldb.addNew(data)
	.catch( (err) => console.log(err) );

// get data from localDB
ldb.get()
	.then( (data) => console.log(data) ) // [ {name: 'Sourav', email: 'keramotul.islam@gmail.com'} ]
	.catch( (err) => console.log(err) );

// update data
ldb.update({name: "Sourav"}, "Abm Sourav")
	.catch( err => console.log(err) );

// Delete data
ldb.del({name: "Abm Sourav"})
	.catch( err => console.log(err) );
```
