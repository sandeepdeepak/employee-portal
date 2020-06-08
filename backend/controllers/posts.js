const Post = require("../models/post");

exports.createPost = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    title: req.body.title,
    company: req.body.company,
    location: req.body.location,
    time: req.body.time,
    role: req.body.role,
    description: req.body.description,
    hour: req.body.hour,
    creator: req.userData.userId,
  });

  post
    .save()
    .then((createdPost) => {
      res.status(201).json({
        message: "Job Post added successfully",
        post: {
          ...createdPost,
          id: createdPost._id,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Creating a job post failed!",
      });
    });
};

exports.updatePost = (req, res, next) => {
  const post = new Post(req.body);

  this.getPost();
  Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post)
    .then((result) => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Couldn't udpate post!",
      });
    });
};

exports.applyPost = (req, res, next) => {
  let postId = req.params.id;
  let userId = req.userData.userId;
  let reqBody = req.body;
  Post.findById(postId)
    .then((getpost) => {
      console.log(getpost);
      if (!getpost.applied) {
        reqBody.applied = [userId];
      } else {
        reqBody.applied = getpost.applied.push(userId);
      }
      const post = new Post(reqBody);
      Post.updateOne({ _id: postId }, post).then((result) => {
        if (result.n > 0) {
          res.status(200).json({ message: "Applied successful!" });
        } else {
          res.status(401).json({ message: "Not authorized!" });
        }
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Couldn't apply post!",
      });
    });
};

exports.getPosts = (req, res, next) => {
  Post.find()
    .then((documents) => {
      fetchedPosts = documents;
      return Post.count();
    })
    .then((count) => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: fetchedPosts,
        maxPosts: count,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching posts failed!",
      });
    });
};

exports.getPost = (req, res, next) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching post failed!",
      });
    });
};

exports.deletePost = (req, res, next) => {
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then((result) => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Deleting posts failed!",
      });
    });
};
