/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var bcrypt = require('bcryptjs');

module.exports = {
	/* registerUser Register a new user into rookmark
		Method : {POST}
		API: /users/signup
		apiParams: emailAddress 'string'
							 password 'string'
		response: If successful, returns user data.
	*/
	registerUser: function(req, res) {
		Users.findOne({emailAddress: req.param('emailAddress')}).exec(function(err, response) {
			if(err)	return console.log(err);

			if(response) {
				return res.status(409).json({error: "email address is already signed up, try logging in"});
			}
			else {
				bcrypt.genSalt(10, function(err, salt) {
    			bcrypt.hash(req.param('password'), salt, function(err, hash) {
						Users.create({emailAddress: req.param('emailAddress'), password: hash}).exec(function(err, response) {
							if(err)	return console.log(err);

							if(response) {
								delete response.password; //Deleting sensitive data
								return res.json(response);
							}
						});
    			});
				});
			}
		});
	},

	/* login Login an existing user into rookmark
		Method : {POST}
		API: /users/signin
		apiParams: emailAddress 'string'
							 password 'string'
		response: If successful, returns user data.
	*/
	login: function(req, res) {
		Users.findOne({emailAddress: req.param('emailAddress')}).exec(function(err, response) {
			if(err)	return console.log(err);

			if(response) {
				bcrypt.compare(req.param('password'), response.password, function(err, flag) {
					if(flag) {
						delete response.password; //Deleting sensitive data
						return res.json(response);
					}
					else {
						return res.status(401).json({error: "Incorrect Password"});
					}
				});
			}
			else {
				return res.status(401).json({error: "Incorrect Email Address"});
			}
		});
	},
};
