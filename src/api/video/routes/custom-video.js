module.exports = {
  routes: [
    {
      method: "POST",
      path: "/videos/init",
      handler: "video.init",
    },
    {
      method: "POST",
      path: "/videos/notificationVideo",
      handler: "video.notificationVideo",
    },
  ],
};
