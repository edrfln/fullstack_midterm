## List API

### Videos

- User object

```
{
videoID: string,
title: string,
thumbnailUrl: string,
videoUrl: string,
  products: [
    {
    productID: string,
    url: string,
    title: string,
    price: string
    },
  ],
  comments: [
    {
      username: string
      text: string
      timestamp : datetime
    },
  ],
}
```

## **GET /videos**

Returns all video thumbnail pictures in the system.

- **URL Params**  
  None
- **Data Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200  
  **Content:**

```
{
  videos: [
           {<videos_object>},
           {<videos_object>},
           {<videos_object>}
         ]
}
```

## **GET /videos/:id**

Returns the details of associated video.

- **URL Params**  
  _Required:_ `id=[integer]`
- **Data Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200  
  **Content:** `{ <video_object> }`
- **Error Response:**
  - **Code:** 404  
    **Content:** `{ error: "Video not found" }`
  - **Code:** 500  
    **Content:** `{ error: "Could not fetch video details" }`

## **GET /videos/:id/comments**

Returns all comments associated with the specified video.

- **URL Params**  
  _Required:_ `id=[integer]`
- **Data Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200  
  **Content:**

```
{
  comments: [
           {<comment_object>},
           {<comment_object>},
           {<comment_object>}
            ]
}
```

- **Error Response:**
  - **Code:** 500
    **Content:** `{ error: "Could not fetch comments" }`

## **GET /videos/:id/products**

Returns all products in associated video.

- **URL Params**  
  _Required:_ `id=[integer]`
- **Data Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200  
  **Content:**

```
{
  products: [
           {<product_object>},
           {<product_object>},
           {<product_object>}
            ]
}
```

- **Error Response:**
  - **Code:** 500
    **Content:** `{ error: "Could not fetch product" }`

## **POST /videos/:id/comments**

Creates a new User and returns the new object.

- **URL Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Data Params**

```
    {
      username: string,
      text: string,
      timestamp: datetime,
    }
```

- **Success Response:**
  - **Code:** 201
    **Content:** `{ <status_object> }`
- **Error Response:**
  - **Code:** 500
    **Content:** `{ error: "Could not add comment" }`
