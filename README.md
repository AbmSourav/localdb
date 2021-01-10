# LocalDB
LocalDB is a NodeJS CRUD API. It uses local file system for CRUD operation. It's a promise based API.

<br>
<br>

## API

**GET** `localDB.get()`

**POST** `localDB.addNew(jsonObject)`

**UPDATE** `localDB.update(jsonObject, newValue)`

**DELETE** `localDB.del(jsonObject)`

<br>

## Uses
```js
const {localDB} = require('@abmsourav/localdb');
const db = localDB();

const data = {names: "Sourav", email: "keramotul.islam@gmail.com"};

// add new data
db.addNew(data)
	.catch( (err) => console.log(err) );

// get data from localDB
db.get()
	.then( (data) => console.log(data) ) // [ {name: 'Sourav', email: 'keramotul.islam@gmail.com'} ]
	.catch( (err) => console.log(err) );

// update data
db.update({name: "Sourav"}, "Abm Sourav") // args: 1.where update'll made, 2.new value
	.catch( err => console.log(err) );

// Delete data
db.del({name: "Abm Sourav"})
	.catch( err => console.log(err) );
```
