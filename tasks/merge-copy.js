module.exports = function( grunt ) {
    'use strict';

	var mergeCopy = require('../lib/merge-copy')(grunt);

    grunt.registerMultiTask( 'merge-copy', 'Merge two or more directories', function() {
        var options = this.options(),
        	files = [],
        	mergeCopyContext;

        // Assuming default encoding.
        options.encoding = options.encoding || grunt.file.defaultEncoding;

        // Init module with current task options.
        mergeCopyContext = mergeCopy(options);

        // Get all merged files
        files = mergeCopyContext.files();

        // Copy all merged file to the destination.
        mergeCopyContext.copy(files || []);
    });
};
