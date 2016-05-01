var config = {
  port: "5760",
  mongodb: "mongodb://localhost/lib",
  session: {
    secret: "lib",
    resave: false,
    saveUninitialized: true
  }
};

module.exports = config;