# Fullstack Track Final Project - Tokopedia Play Clone

This is a simple web to show video selling product in YouTube. allowing users to explore and interact with a curated list of seller's videos.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [API Structure](#api-structure)
- [Database Scheme](#database-scheme)
- [List API](#list-api)

## Features

- Video List : Display a list of videos with their corresponding thumbnail images, making it easy for users to browse through available content.
- Video Detail Page : Clicking on a video from the list opens a detailed view of the selected video. The detail page showcases an embedded YouTube video player, allowing users to watch the video without leaving the app.
- Comments and Interaction : Users can engage with the videos by posting comments on the video detail page. To post a comment, users only need to provide their name and comment text.

## Installation & Run Locally

Clone the project

```bash
git clone https://github.com/edrfln/fullstack_midterm.git
```

Navigate to Project Directory
In the terminal, navigate to the root directory of your project where the package.json file is located. You can use the cd (Change Directory) command to do this.

```bash
cd /fullstack_midterm/server
```

Install dependencies with npm

```bash
  npm install
```

Start connection in MongoDB. You can modify database name in `index.js` if you want to use your own database. For this repository you need to make database named `video-player`. To create database you can use this command.

```bash
mongod
use video-player
```

Start the server

```bash
node index.js
```

Export JSON file in folder "Data" to detailed collections in MongoDB
| File name | Collections |
| :-------- | :------- |
| `comments.json` | `comments` |
| `videos.json` | `videos` |
| `products.json` | `products` |

## API Structure

### Video thumbnail List

Endpoint: `GET /videos`

Description: Retrieves a list of all videos in the database showing the thumbnail pictures and video's title.

### Get Video by ID

Endpoint: `GET /videos/:videoId`

Description: Retrieves detailed information about a specific video based on the provided `videoId`.

### Product List by productID

Endpoint: `GET videos/:videoId/products`

Description: Retrieves detailed information about a specific product based on the provided `videoId`.

### Comment List by videoID

Endpoint: `GET /videos/:videoId/comments`

Description: Retrieves all comments associated with a specific video based on the provided `videoId`.

### Submit Comment to Video

Endpoint: `POST /videos/:videoId/comments`

Description: Adds a new comment to a specific video based on the provided `videoId`. Requires the following fields in the request body:

- `username` (String, Required): The name of the user posting the comment.
- `text` (String, Required): The content of the comment.

## Database Scheme

### Collection Name: `videos`

This collection is used to store video-related information. Each document in the collection represents a single video.

**Document Structure:**

- `title` (String, Required): The title of the video.
- `thumbnailUrl` (String, Required): The URL of the video's thumbnail image.
- `videoUrl` (String, Required): The URL of the YouTube video.
- `products` (Array of Objects): An array of objects containing details of products associated with the video. Each product object has the following fields:
  - `url` (String, Required): The URL of the product.
  - `title` (String, Required): The title or name of the product.
  - `price` (Number, Required): The price of the product.
- `comments` (Array of Objects): An array of objects containing details of comments posted on the video. Each comment object has the following fields:
  - `username` (String, Required): The name of the user who posted the comment.
  - `text` (String, Required): The content of the comment.
  - `timestamp` (Date, Required): The timestamp when the comment was posted.

### Collection: `products`

This collection is used to store product-related information. Each document in the collection represents a single product.

**Document Structure:**

- `url` (String, Required): The URL of the product.
- `title` (String, Required): The title or name of the product.
- `price` (Number, Required): The price of the product.

### Collection: `comments`

This collection is used to store comments related to the videos. Each document in the collection represents a single comment.

**Document Structure:**

- `username` (String, Required): The name of the user who posted the comment.
- `text` (String, Required): The content of the comment.
- `timestamp` (Date, Required): The timestamp when the comment was posted.

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
