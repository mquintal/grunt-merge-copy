module.exports = function( grunt ) {
    'use strict';
	
    var fs = require( 'fs' )
      , path = require( 'path' )
    
    grunt.registerMultiTask( 'merge-copy', 'Merge two directories', function() {
        var options = {
			common: this.options().common || 'common'
		  , specific: this.options().specific || 'specific'
		  , encoding: this.options().encoding || grunt.file.defaultEncoding
		};
		
		var copyOptions = {
			encoding: options.encoding,
		};
		
		
         
        /**
         * Method responsible for returning files into given path
         * 
         * @param {String} basePath - path to list all files.
         * 
         * @date 2014-10-03
         * */  
        function getPathFiles( basePath ) {
            var arrFiles = [];
             
            // Check if base path is a directory.
            if( grunt.file.isDir( basePath ) ) {
                
                grunt.file.recurse( basePath, function( file  ) {
                    arrFiles.push( file );
                });
                
            } else {
                grunt.log.errorlns( 'Directory "', basePath, '" NOT FOUND.' );
            }
            
            return arrFiles;
        }
        
        
        /**
         * Returns all common and specific files.
         *
         * @date 2014-11-03
         * */
        function getFiles( commonDir, specificDir ) {
            var arrCommonFiles = []
              , arrClientFiles = [];
            
            return { 
                common: getPathFiles( commonDir )
              , specific: getPathFiles( specificDir )
            };
        }
        
        /**
         * Returns all common and specific files.
         * 
         * @param {String} basePath
         * @param {String} file
         * 
         * @date 2014-11-03
         * */
        function getRelativePath( basePath, file ) {
            var absolutePath = path.resolve( file, '.' )
              , relativePath = absolutePath.replace( basePath, '' );
            
            relativePath = relativePath.split( path.sep );
            
            if( relativePath[ 0 ] === '' ) {
                relativePath.shift( );
            }
            relativePath.shift( );
            
            return relativePath.join( path.sep );
        }
        
        /**
         * Merges common and specific array.
         *
         * 
         * @date 2014-11-03
         * @author arodrigues
         * */
        function mergeArrays( basePath ,commonFiles, specificFiles ) {
            var commonPath = ''
              , specificPath = ''
              , arrResult = []
              , fileFound = false;
            
            basePath = path.resolve( basePath, '.' );

            for( var common in commonFiles ) {
                if( commonFiles.hasOwnProperty( common ) ) {
                    fileFound = false;
                    commonPath = getRelativePath( basePath, commonFiles[ common ] );

                    if( specificFiles ) {

                        specificFiles.forEach( function( file ) {
                            specificPath = getRelativePath( basePath, file );

                            // Check if relative and common are equal.
                            if( specificPath === commonPath ) {
                                // Delete this index from result array.
                                arrResult.push( { relative: specificPath, absolute: file } );
                                fileFound = true;
                                return ;
                            }

                        });

                    }

                    if( !fileFound ) {
                        arrResult.push( { relative: commonPath, absolute: commonFiles[ common ] } );
                    }

                }
            }

            if( specificFiles ) {
                specificFiles.forEach( function( file ) {
                    if( !commonFiles.hasOwnProperty( file ) ) {
                        specificPath = getRelativePath( basePath, file );
                        arrResult.push( { relative: specificPath, absolute: file } );
                    }
                });
            }
            
            return arrResult;
        }
        
        /**
         * Copy all file to dest directory.
         * 
         * @param {String} dest - destination directory
         * @param {Array} files - all files to copy [{ relative: '', absolute: '' }, ...]
         *
         * @date 2014-11-03
         * @author arodrigues
         * */
        function copyFiles( dest, files ) {
            dest = path.resolve( dest, '.' );
            
            
            files.forEach( function( file ) {
                var src = path.resolve( file.absolute, '.' )
                  , destFile = path.resolve( dest + '/' + file.relative, '.' );
                
                // Copy file.  
                grunt.file.copy( src, destFile, copyOptions );
                
                grunt.log.debug( 'File copied: \n\tfrom: ', src, '\n\tto: ' + destFile );
            });    
        }
        
        
        this.files.forEach( function( filePair ) {
            var source = grunt.util.kindOf( filePair.src ) === 'array' ? filePair.src[0] : filePair ||''
              , commonDir =  [ source, options.common ].join( '/' )
              , specificDir = [ source, options.specific ].join( '/' )
              , files = null; 
              
            
            files = getFiles( commonDir, specificDir );
            
            grunt.log.debug( 'Common Files: \n\t', files.common );
            grunt.log.debug( 'Specific Files: \n\t', files.specific, '\n' );
            
            // Merge commoin files
            files = mergeArrays( filePair.src[0], files.common, files.specific );
            
            grunt.log.debug( 'Merged Files: \n\t', files );
            
             // Copy all files
            copyFiles( filePair.dest, files );
        });
    });

};
