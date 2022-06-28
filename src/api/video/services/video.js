"use strict";

/**
 * video service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::video.video", ({ strapi }) => ({
  async getType(title) {
    const types = await strapi.service("api::video-type.video-type").find();
    let type;
    types.results.forEach((t) => {
      if (title.toLowerCase().includes(t.name)) {
        type = t.name;
      }
    });

    return type || "special";
  },
}));
