/**
 * BookmarksController
 *
 * @description :: Server-side logic for managing bookmarks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	/* createBookmark Create a new bookmark into rookmark
		Method : {POST}
		API: /bookmarks/create
		apiParams: user 'string' The user id
							 name 'string' The bookmark name
							 url 'string' The bookmark URL
							 tags 'string'	The bookmark tags separated by commas
		response: If successful, returns bookmark data.
	*/
	createBookmark: function(req, res) {
		var data = req.allParams();
		var tags = req.param('tags').toLowerCase();
		tags = tags.replace(/\s/g,'');
		tags = tags.split(",");
		data.tags = tags;
		Bookmarks.create(data).exec(function(err, response) {
			if(err)	return console.log(err);

			if(response) {
				return res.json(response);
			}
		});
	},

	/* viewBookmarks View all user bookmarks from rookmark
		Method : {GET}
		API: /bookmarks/read/:id
		apiParams: id 'string' The user id
		response: If successful, returns bookmark data.
	*/
	viewBookmarks: function(req, res) {
		Bookmarks.find({user: req.param('id')}).exec(function(err, response) {
			if(err)	return console.log(err);

			if(response.length) {
				return res.json(response);
			}
			else {
				return res.status(404).json({error: "Seems you haven't bookmarked, start rookmarking now"});
			}
		});
	},

	/* deleteBookmark Delete a particular bookmark
		Method : {DELETE}
		API: /bookmarks/delete
		apiParams: id 'string' The bookmark id
		response: If successful, returns bookmark data.
	*/
	deleteBookmark: function(req, res) {
		Bookmarks.destroy({id: req.param('id')}).exec(function(err, response) {
			if(err)	return console.log(err);

			if(response) {
				return res.json(response);
			}
			else {
				return res.status(404).json({error: "There seems to be a problem, try again later"});
			}
		});
	},

};
