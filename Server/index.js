const express = require("express");
const mongoose = require("mongoose");

const Video = require("./Models/videos");
const Comment = require("./Models/comment");
const Product = require("./Models/product");

const app = express();
app.use(express.json());

//connect to mongo
mongoose
  .connect("mongodb+srv://edeniafiliana:417Qn0zNVxSt2OzH@gigihlab.jux4pvq.mongodb.net/video-player", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.error("Error Connecting:", err);
  });

//show video lists
app.get("/videos", async (req, res) => {
  try {
    const videos = await Video.find({}, "title thumbnailUrl").exec();
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch videos" });
  }
});

//video details
app.get("/videos/:videoId", async (req, res) => {
  try {
    const { videoId } = req.params;

    const video = await Video.findById(videoId).populate("comments").populate("products").exec();
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }

    res.status(200).json(video);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch video details" });
  }
});

//get comments
app.get("/videos/:videoId/comments", async (req, res) => {
  try {
    const { videoId } = req.params;

    const comments = await Comment.find({ video: videoId }).exec();
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch comments" });
  }
});

app.get("/videos/:videoId/products", async (req, res) => {
  try {
    const { videoId } = req.params;

    const product = await Product.find({ video: videoId }).exec();
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch product" });
  }
});

//add commment in video
app.post("/videos/:videoId/comments", async (req, res) => {
  try {
    const { videoId } = req.params;
    const { username, text } = req.body;

    const comment = new Comment({
      username: username,
      text: text,
      video: videoId,
      timestamp: new Date(),
    });

    await comment.save();

    //update the comments array in the video document
    await Video.findByIdAndUpdate(videoId, { $push: { comments: comment._id } });

    res.status(201).json({
      status: "Success",
      message: "Comment submitted successfully",
      comment: text,
    });
  } catch (err) {
    console.error("Error while post a comment:", err);
    res.status(500).json({
      status: "Fail",
      message: "Could not add comment",
      error: err.message,
    });
  }
});

//add data products to video data
app.post("/videos/:videoId/products", async (req, res) => {
  try {
    const { videoId } = req.params;
    const { url, title, price } = req.body;

    const product = new Product({
      url: url,
      title: title,
      price: price,
      video: videoId,
    });

    await product.save();

    //update the products array in the video document
    await Video.findByIdAndUpdate(videoId, { $push: { products: product._id } });

    res.status(201).json(product);
  } catch (err) {
    console.error("Error while post a product:", err);
    res.status(500).json({
      status: "Fail",
      message: "Could not add product",
      error: err.message,
    });
  }
});

//add video data
app.post("/videos", async (req, res) => {
  try {
    const { title, thumbnailUrl, videoUrl } = req.body;

    const video = new Video({
      title: title,
      thumbnailUrl: thumbnailUrl,
      videoUrl: videoUrl,
      comments: [],
      products: [],
    });

    await video.save();

    res.status(201).json(video);
  } catch (err) {
    console.error("Error while posting video data:", err);
    res.status(500).json({ error: "Could not save video data" });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
