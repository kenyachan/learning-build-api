# Express ads api

``` terminal
// insert
curl -X POST -H 'Content-Type: application/json' -d '{
    "title": "Pizza",
    "price": 10.5,
    "something": "test"
}' http://localhost:3001/

// get all
curl http://localhost:3001/

// update
curl -X PUT -H 'Content-Type: application/json' -d '{
    "price": 12.5
}' http://localhost:3001/$ID

// delete
curl -X DELETE http://localhost:3001/$ID
```
