const amqp = require("amqplib/callback_api");

class CommentService {
  constructor(commentRepository) {
    this.commentRepository = commentRepository;
  }

  async create(comment) {
    try {
      const response = await this.commentRepository.create(comment);
      amqp.connect(process.env.rabbit_MR_URL, (error0, connection) => {
        if (error0) throw error0;

        connection.createChannel((error1, channel) => {
          if (error1) throw error1;

          const queue = "create_comment";
          const msg = JSON.stringify({
            postId: comment.postId,
            commentId: response._id,
          });

          channel.assertQueue(queue, { durable: false });
          channel.sendToQueue(queue, Buffer.from(msg));

          console.log("[x] Sent %s", msg);
        });
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async delete(commentId) {
    try {
      const response = await this.commentRepository.delete(commentId);
      amqp.connect(process.env.rabbit_MR_URL, (error0, connection) => {
        if (error0) throw error0;

        connection.createChannel((error1, channel) => {
          if (error1) throw error1;

          const queue = 'delete_comment';
          const msg = JSON.stringify({
            postId: response.postId,
            commentId
          });

          channel.assertQueue(queue, {durable: false});
          channel.sendToQueue(queue, Buffer.from(msg));

          console.log("[x] message delete sent %s", msg);
        });
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CommentService;
