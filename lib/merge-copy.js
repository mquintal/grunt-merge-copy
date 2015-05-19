module.exports = function(grunt) {
	var path = require( 'path' );
	var mergeCollectFiles = require('node-merge-collect-files');
	
	return function(options){

		options = options || {};
		
		/**
		 * Responsible for merging the directories files.
		 * @return {Array} - merged files
		 */
		function getFilesToCopy() {
			var files = [];

			files = mergeCollectFiles(options.directories, options.patterns, options.globOptions);
			
			return files || [];
		}
		/**
		 * Responsible for copying all files to a destination directory.
		 * @param {Array} files - all files to copy
		 */
		function copyFiles(files) {
			var file,
				fileInfo,
				destination,
				source;
			
			for (file in files) {
				if (files.hasOwnProperty(file) ) {
					fileInfo = files[file];
					source = fileInfo.absolutePath || '';
					destination = path.join(options.destination, file);
					
					grunt.file.copy(source, destination, options);
				}
			}
		}
		
		// Public module methods.
		return {
			files: getFilesToCopy,
			copy: copyFiles
		}
	}

};
