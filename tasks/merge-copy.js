module.exports = function( grunt ) {
    'use strict';

	var mergeCopy = require('../lib/merge-copy')(grunt);

    grunt.registerMultiTask( 'merge-copy', 'Merge two or more directories', function() {
        var options = this.options(),
			files = [],
			mc;

		// Assuming default encoding.
		options.encoding = options.encoding || grunt.file.defaultEncoding;

		// Init module with current task options.
		mc = mergeCopy(options);

		// Get all merged files
		files = mc.files();

		// Copy all merged file to the destination.
		mc.copy(files || []);
    });
};
