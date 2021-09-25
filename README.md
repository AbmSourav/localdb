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

**INSERT** `localDB.insert(jsonObject, jsonObject)`

**UPDATE** `localDB.update(jsonObject, jsonObject)`

**DELETE** `localDB.remove(jsonObject)`

**SEARCH** `localDB.search(string, string, bool)`

**SEARCH** `localDB.searchByValue(string, bool)`

<br>

## Initialization
create a json file on your project root and initialize like below.
Please note: It must be a json file.
```js
const ldb = localDB('./db.json');
```

<br>

## API Uses
```js
const {localDB} = require('@abmsourav/localdb');
const ldb = localDB('./db.json');

const data = {names: "Sourav", email: "keramotul.islam@gmail.com"};

// add new data
ldb.set(data)
	.catch( (err) => console.log(err) );

// Insert data on and existing object
ldb.insert({"id": "1247flsf"}, {"Full Name": "Keramot UL Islam"})	// 1. find the object, 2. add property and value
	.catch( (err) => console.log(err) );

// get data from localDB
ldb.get()
	.then( (data) => console.log(data) ) // [ {name: 'Sourav', email: 'keramotul.islam@gmail.com'} ]
	.catch( (err) => console.log(err) );

// update data
ldb.update({"id": "abm"}, {name: "AbmSourav"}) // args: 1.where update'll made, 2.new data
	.catch( err => console.log(err) );

// Delete data
ldb.remove({name: "Abm Sourav"})
	.catch( err => console.log(err) );

// Search unique data
ldb.search("id", "123454ls")	// key and value
	.then( data => console.log(data) );

// search all matches data
ldb.search("name", "Sourav", false)	// key, value and unique
	.then( data => console.log(data) );

// Search all data that matches this value 
ldb.searchByValue("Abm Sourav")
	.then( data => console.log(data) );

// Search unique data that matches the value
ldb.searchByValue("Abm Sourav", true)
	.then( data => console.log(data) );

```

<br>

.
