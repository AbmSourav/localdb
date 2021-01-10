# localdb
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

db.addNew({"name": "Sourav"})
console.log(db.get())
db.update({"name": "Abm Sourav" })
db.del({"name": "Abm Sourav"})
```
