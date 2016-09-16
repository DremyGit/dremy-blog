const nodemailer = require('nodemailer');
const config = require('../config');
var privateConfig = require('../config/private');

const mailUtil = {};

var transporter = nodemailer.createTransport(config.smtp);

mailUtil.sendCommentMentionToMe = (blog, comment) => {
  if (process.env.NODE_ENV !== 'test' && privateConfig.email.sender && privateConfig.email.receiver) {
    const sendCommentMention = transporter.templateSender({
      subject: '[Dremy Blog] 收到来自 {{ user }} 的评论',
      from: privateConfig.email.sender,
      to: privateConfig.email.receiver,
      text: '您的文章《{{ blog_name }}》收到来自 {{ user }} 的评论:\n{{ content }}\n{{ time }}',
      html: '<p>你的文章《{{ blog_name }}》收到来自 {{ user }} 的评论:</p><hr><blockquote>{{ content }}</blockquote><p>{{ time }}</p>'
    });

    sendCommentMention({}, {
      user: comment.user,
      content: comment.content,
      blog_name: blog.title,
      time: new Date().toLocaleString()
    }, senderHandle);
  }
};


mailUtil.sendReplyMetionToMe = (blog, comment, targetComment) => {

  if (process.env.NODE_ENV !== 'test' && privateConfig.email.sender && privateConfig.email.receiver) {
    const sendCommentMention = transporter.templateSender({
      subject: '[Dremy Blog] {{ target_user }} 在《{{ blog_name }}》的评论收到来自 {{ user }} 的回复',
      from: privateConfig.email.sender,
      to: privateConfig.email.receiver,
      text: '您的文章《{{ blog_name }}》由 {{ target_user }} 发布的评论:\n{{ target_content }}\n收到来自 {{ user }} 的回复:\n{{ content }}\n{{ time }}',
      html: '' +
      '<p>您的文章《{{ blog_name }}》由 {{ target_user }} 发布的评论:</p>' +
      '<blockquote>{{ target_content }}</blockquote>' +
      '<p>收到来自 {{ user }} 的回复:</p>' +
      '<blockquote>{{ content }}</blockquote>' +
      '<p>请点击链接查看文章: <a href="{{ blog_url }}">{{ blog_url }}</a></p>' +
      '<p>{{ time }}</p>'
    });

    sendCommentMention({}, {
      user: comment.user,
      content: comment.content,
      blog_name: blog.title,
      blog_url: config.host + '/blog/' + blog.code,
      target_user: targetComment.user,
      target_content: targetComment.content,
      time: new Date().toLocaleString()
    }, senderHandle);
  }
};

mailUtil.sendReplyMetionToTheUser = (blog, comment, targetComment) => {
  if (process.env.NODE_ENV !== 'test' && privateConfig.email.sender) {
    const sendCommentMention = transporter.templateSender({
      subject: '[Dremy Blog] 您在Dremy Blog的评论收到来自 {{ user }} 的回复',
      from: privateConfig.email.sender,
      text: '{{ your_user }} 您好, 您在文章《{{ blog_name }}》发表的评论:\n{{ your_content }}\n收到来自 {{ user }} 的回复:\n{{ content }}\n{{ time }}',
      html: '' +
      '<p>{{ your_user }} 您好</p>' +
      '<p>您在文章《{{ blog_name }}》发表的评论:</p>' +
      '<blockquote>{{ your_content }}</blockquote>' +
      '<p>收到来自 {{ user }} 的回复:</p>' +
      '<blockquote>{{ content }}</blockquote>' +
      '<p>请点击链接查看文章: <a href="{{ blog_url }}">{{ blog_url }}</a></p>' +
      '<p>{{ time }}</p>'
    });

    sendCommentMention({
      to: targetComment.email
    }, {
      user: comment.user,
      content: comment.content,
      blog_name: blog.title,
      blog_url: config.host + '/blog/' + blog.code,
      your_user: targetComment.user,
      your_content: targetComment.content,
      time: new Date().toLocaleString()
    }, senderHandle);
  }
};

function senderHandle(err, info) {
  if(err){
    console.log(err);
  }else{
    console.log('Send email success');
  }
}

module.exports = mailUtil;
