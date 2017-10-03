/* ********************************************************************
 * Logs prettified to console.
 ********************************************************************/
/*jshint node: true*/
/*jshint esversion: 6*/

(function() {

  var winston = require('winston');
  var uuidv4 = require('uuid/v4');

  module.exports = {
    middleware: function() {
      return function (req, res, next) {
        req.logger = winston;
        next();
      };
    },
    logger: winston
  };
}());
