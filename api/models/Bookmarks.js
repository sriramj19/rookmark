/**
 * Bookmarks.js
 *
 * @description :: TODO: The model represents all bookmark entities.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    url: {
      type: 'string',
      required: true
    },
    tags: {
      type: 'array',
      defaultsTo: ['general']
    },
    user: {
      model: 'users'
    }
  }
};
