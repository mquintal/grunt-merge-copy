var path = require( 'path' );
var mergeCollectFiles = require('node-merge-collect-files');

module.exports = function( grunt ) {
    'use strict';

    grunt.registerMultiTask( 'merge-copy', 'Merge two or more directories', function() {
        var options = this.options();

        if ( !options.encoding ) {
            options.encoding = grunt.file.defaultEncoding;
        }

        var copyOptions = {
            encoding: options.encoding
        };


        var files = mergeCollectFiles( options.directories, options.patterns );

        for ( var relativeFilePath in files ) {
            if ( files.hasOwnProperty( relativeFilePath ) ) {
                var fileInfo = files[ relativeFilePath ];

                grunt.file.copy( fileInfo.absolutePath, path.join( options.destination, relativeFilePath ), copyOptions );
            }
        }
    });

};
