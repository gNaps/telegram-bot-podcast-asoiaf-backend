"use strict";

const axios = require("axios");
/**
 *  video controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::video.video", ({ strapi }) => ({
  async init(ctx) {
    let pageToken;
    let entities = [];

    for (let i = 0; i < 2; i++) {
      const config = {
        method: "get",
        url: `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=UU9xEEsAdRQk90ZHTXABWv6A&key=${
          process.env.YT_KEY
        }&part=snippet&maxResults=50${
          pageToken ? "&pageToken=" + pageToken : ""
        }`,
        headers: {},
      };
      const res = await axios(config);
      if (res.data) {
        pageToken = res.data.nextPageToken;
        await res.data.items.forEach(async (i) => {
          const entity = {
            idYoutube: i.snippet.resourceId.videoId,
            ytPublished: i.snippet.publishedAt,
            title: i.snippet.title,
            description: i.snippet.description,
            image: i.snippet.thumbnails.high.url,
            type: await strapi
              .service("api::video.video")
              .getType(i.snippet.title),
          };
          try {
            await strapi.service("api::video.video").create({ data: entity });
          } catch (err) {
            console.log(err);
          }

          entities = [...entities, entity];
        });
      }
    }
    return;
  },

  async notificationVideo(ctx) {
    const text = "Nuovo video";
    console.log(ctx.request.body);
    const config = {
      method: "get",
      url: `https://api.telegram.org/bot${process.env.TELEGRAM_KEY}/sendMessage?chat_id=${process.env.TELEGRAM_CHAT_ID}&text=${text}&parse_mode=markdown`,
      headers: {},
    };
    await axios(config);
    return text;
  },

  async notificationVideoAcknowledge(ctx) {
    console.log(ctx);
    const text = "Hello from YT";
    const config = {
      method: "get",
      url: `https://api.telegram.org/bot${process.env.TELEGRAM_KEY}/sendMessage?chat_id=${process.env.TELEGRAM_CHAT_ID}&text=${text}&parse_mode=markdown`,
      headers: {},
    };
    await axios(config);
    return text;
  },
}));
