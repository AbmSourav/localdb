# LocalDB
LocalDB is a NodeJS CRUD API. 
It uses local file system for CRUD operation. It's a promise based API.

<br>
<br>

## Installation
`npm i @abmsourav/localdb`

<br>

## API

**GET** `localDB.get()`

**POST** `localDB.set(jsonObject)`

**UPDATE** `localDB.update(jsonObject, newValue)`

**DELETE** `localDB.remove(jsonObject)`

<br>

## Uses

```js
const {localDB} = require('@abmsourav/localdb');
const ldb = localDB();

const data = {names: "Sourav", email: "keramotul.islam@gmail.com"};

// add new data
ldb.set(data)
	.catch( (err) => console.log(err) );

// get data from localDB
ldb.get()
	.then( (data) => console.log(data) ) // [ {name: 'Sourav', email: 'keramotul.islam@gmail.com'} ]
	.catch( (err) => console.log(err) );

// update data
ldb.update({name: "Sourav"}, "Abm Sourav") // args: 1. where update'll made, 2. new value
	.catch( err => console.log(err) );

// Delete data
ldb.remove({name: "Abm Sourav"})
	.catch( err => console.log(err) );
```

<br>

### You can also add your own db file
Please note: It must be a json file.
```js
const ldb = localDB('./db.json');
```

<br>

### Promise Supports
```js
ldb.set({"email": "keramotul.islam@gmail.com"})
	.then(() => ldb.update({"greetings": "Hello World"}, "Hello Universe"))
	.then( () =>  ldb.remove({"name": "ABM Sourav"}))
	.then( () =>  ldb.get().then(data => console.log(data)));


ldb.update({"name": "Sourav"}, "Abm Sourav")
	.then(() => ldb.remove({"greetings": "Hello Universe"}))

```
