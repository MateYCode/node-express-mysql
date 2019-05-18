# Express API REST

**Running on 4005, the express server will accept these routes:**
### `POST /api/item`
	 
```json
{
	"id": 1, 
	"name": "John",
	"languages": ["Python","Node", "C"]
}
```
#### Validation Criteria:

 - **id**: integer (Required)
 - **name**: string (Required)
 - **languages**:  string array (Optional)

#### On validation error: `400 BAD REQUEST`
An array of errors is returned
```json
{
    "errors": [
        "id is not of a type(s) integer",
        "instance requires property 'languages'",
        "instance additionalProperty 'languags' exists in instance when not allowed"
    ]
}
```
#### On malformed `JSON`: 
```json
{
	"error": true,
	"message": "Invalid JSON"
}
```
#### 200 OK:
Duplicated `languages` (if any) are removed and `JSON` is returned

---

 ### `GET /api/file/{filename}` 
 
Files should be stored in `/resources`. The requested `file/` and `content-type` is returned if it exists.

---

 ### `POST /api/catalog/article`

```json
{
	"title": "Article title",
	"description": "Article description"
}
```

#### Validation Criteria:

- **title**: string (Required)
- **content**: string (Required)

#### 200 OK:
Data is stored in MySql database and the `id` is returned
```json
{
	"id": 1
}
```

---

 ### `GET /api/catalog/article/{id}`

 The article matching the `{id}` is returned

```json
{
	"id": 1,
	"title": "The article title...",
	"description": "The article description...",
	"date":  automatically initializated timestamp
}
```
If not found, 
```json
{
	"msg": "article not found"
}
```

---

## Getting Started

MySql connection is defined on `/lib/mySqlLib.js`
```javascript
const pool = mysql.createPool(
	{
		connectionLimit : 10,
		host: 'localhost',
		user: 'user',
		password: 'password',
		database: 'database'
	}
);
```

### Prerequisites

 * Node
 * MySql

**Dependencies:**

* body-parser
* express
* helmet
* jsonschema
* mysql


**Dev Dependencies:**

* mocha
* chai
* chai-http
* eslint

---

## Running the tests
For unit testing simply run `npm run test`.\
Or to test them individually run:\
`mocha test/`
* file
* article 
* item

---
## License

See  [LICENSE.md](LICENSE.md) file for details

