const Post = require('../../models/Post');

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }, context, info) {
      try {
        const post = await Post.findById(postId);
        if(post) {
          return post;
        } else {
          throw new Error('post not fund');
        }

      } catch(err){
        throw new Error(err);
      }
    }
  }
};
