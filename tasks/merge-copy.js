module.exports = function( grunt ) {
    'use strict';
	
	var mergeCopy = require('../lib/merge-copy')(grunt);

    grunt.registerMultiTask( 'merge-copy', 'Merge two or more directories', function() {
        var options = this.options(),
			files = [];
		
		// Assuming default encoding.
		options.encoding = options.encoding || grunt.file.defaultEncoding;
		
		// Init module with current task options. 
		mergeCopy = mergeCopy(options);
		
		// Get all merged files
		files = mergeCopy.files();
		
		// Copy all merged file to the destination.
		mergeCopy.copy(files || []);
    });

};
