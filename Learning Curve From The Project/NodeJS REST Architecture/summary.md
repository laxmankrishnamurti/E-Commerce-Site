# KEY TAKEAWAYS

## REST ===> Representational State Transfer

It is a way of building web API in a logical way making them easy to consume. Keep in mind when we build an API, it can consumed by us and it can also be consumed by others for that we need to make the process of consuming the APIs as smooth as possible for the users.

We need to follow some principles which every REST API should adhere to ::

1. We need to separate our API into logical resources.

   - Resource ===> A resource is an object or representation of something which has data associated to it. Any information that can be named be a resource. But keep in mind it has to be a name, or noun(in plural form) not verb.
     - products, users, reviews, movies, .........etc

2. Expose structured, resource based URL.

   - An API have multiple end-points
   - So, end-point should only contains resouces and not the action that can be performed on them.

3. Use HTTP methods

   - GET ===> Read
   - POST ===> Create
   - PUT ===> Update Existing Data ===> Client is supposed to send the entire updated object
   - PATCH ===> Update Existing Data ===> Client only send the part of the object that has been changed.
   - DELETE ===> Delete

4. Send JSON data in response

```json
//JSON DATA

[
  {
    "id": 1,
    "image": "https://p1-ofp.static.pub/medias/25470493404_82XQAG_202211110210051679244435221.png",
    "title": "Lenovo ideapad slim-3",
    "price": 24500
  },
  {
    "id": 1,
    "image": "https://p1-ofp.static.pub/medias/25470493404_82XQAG_202211110210051679244435221.png",
    "title": "Lenovo ideapad slim-3",
    "price": 24500
  },
  {
    "id": 1,
    "image": "https://p1-ofp.static.pub/medias/25470493404_82XQAG_202211110210051679244435221.png",
    "title": "Lenovo ideapad slim-3",
    "price": 24500
  }
]
```

```json
// JSend JSON DATA

{
  "status": "Success",
  "message": "all users data",
  "data": {
        [
            {
                "id": 1,
                "image": "https://p1-ofp.static.pub/medias/25470493404_82XQAG_202211110210051679244435221.png",
                "title": "Lenovo ideapad slim-3",
                "price": 24500
            },
            {
                "id": 1,
                "image": "https://p1-ofp.static.pub/medias/25470493404_82XQAG_202211110210051679244435221.png",
                "title": "Lenovo ideapad slim-3",
                "price": 24500
            },
            {
                "id": 1,
                "image": "https://p1-ofp.static.pub/medias/25470493404_82XQAG_202211110210051679244435221.png",
                "title": "Lenovo ideapad slim-3",
                "price": 24500
            }
        ]
    }
}
```

5. API must be stateless.

#### STATELESS RESTful API :: All state in handled on the client. This means that each request must contain all the information necessary to process a certain request.

<code>The server should not have to remember previous request.</code>

- Ex :: /movies/nextpage ===> In this case server must remember the previous state

Better approach :: /movies/page/4 ===> In this case server dosen't need to store the previous state, it should be sent by frontend.
