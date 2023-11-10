// create web server
import { Router } from 'express';
var router = Router();

// load mongoose module
import { Schema, model, connect } from 'mongoose';

// create mongoose schema
var commentSchema = Schema({
  name: String,
  comment: String,
  created_at: Date
});

// create mongoose model
var Comment = model('Comment', commentSchema);

// connect mongoose
connect('mongodb://localhost:27017/comment');

// create route
// GET /comments
router.get('/', function(req, res, next) {
  // find all comments
  Comment.find(function(err, comments) {
    if (err) return res.status(500).send({error: 'database failure'});
    res.render('comments', {comments: comments});
  });
});

// POST /comments
router.post('/', function(req, res, next) {
  // create new comment
  var comment = new Comment();
  comment.name = req.body.name;
  comment.comment = req.body.comment;
  comment.created_at = new Date();

  // save comment
  comment.save(function(err) {
    if (err) {
      console.error(err);
      res.json({result: 0});
      return;
    }
    res.redirect('/comments');
  });
});

// export router
export default router;