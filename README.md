# RestaurantAPI CRUD Operation 
## URL: https://restaurant-api-qezq.onrender.com/

## Libraries and Frameworks
- NodeJS
- ExpressJS
- Mongoose
- MongoDB Atlas
- cors (cross origin resource sharing)

## REST API (/api/restaurants)

### GET Requests (Retrieve)
- /api/restaurants?page=1&perPage=10 borough=Queens

- /api/restaurants/:id


### POST Requests (Create)
- /api/restaurants/  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Body

```
{
    "address": {
        "building": "97-22",
        "coord": [
            -73.8601152,
            40.7311739
        ],
        "street": "63 Road Loud",
        "zipcode": "11374"
    },
    "borough": "Queens",
    "cuisine": "Jewish/Kosher",
    "grades": [
        {
        "date": "2014-11-24T00:00:00.000Z",
        "grade": "Z",
        "score": 20
        }
    ],
    "name": "My New Restaurant",
    "restaurant_id": "123456"
}
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Response object along with id such as: 639e00a43c8e09cedecf134c


### PUT Requests (Update)
- /api/restaurants/:id  
- /api/restaurants/639e00a43c8e09cedecf134c

```
{
    "address": {
        "building": "97-22",
        "coord": [
            -73.8601152,
            40.7311739
        ],
        "street": "63 Road Loud",
        "zipcode": "11374"
    },
    "borough": "Queens",
    "cuisine": "Jewish/Kosher",
    "grades": [
        {
        "date": "2014-11-24T00:00:00.000Z",
        "grade": "Z",
        "score": 20
        }
    ],
    "name": "My New Restaurant Updated",
    "restaurant_id": "123456"
}
```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Response Message: "restaurantId: 639e00a43c8e09cedecf134c successfully updated"

### Delete Requests (Delete)
- /api/restaurants/:id
- /api/restaurants/639e00a43c8e09cedecf134c

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Response Message: "restaurantId: 639e00a43c8e09cedecf134c successfully deleted"


## Deployed using render.com
- step 1: web services -> connect with gitHub -> select repo 
- step 2: Name: "restaurant-api", Root directory: "." , Build Command: "npm install"
- step 3: Advanced -> Environment Variables -> Put .env file key and value pair