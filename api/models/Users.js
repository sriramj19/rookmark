/**
 * Users.js
 *
 * @description :: TODO: Data for handling users
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    emailAddress: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    }
  }
};
