module.exports = function(grunt) {
	var path = require( 'path' );
	var File = require('./merge-copy-file');
	var mergeCollectFiles = require('node-merge-collect-files');
	
	return function(options){

		options = options || {};
		
		function _copyFile(source, destination) {
			grunt.file.copy(source, destination, options);
		}

		/**
		 * Responsible for merging the directories files.
		 * @return {Array<File>} merged files
		 */
		function getFilesToCopy() {
			var mergedFiles = {};
			var mergedFilesKeys = [];
			var files = [];

			mergedFiles = mergeCollectFiles(options.directories, options.patterns, options.globOptions);
			mergedFilesKeys = Object.keys(mergedFiles);
			
			mergedFilesKeys.forEach(function (file) {
				var source = mergedFiles[file].absolutePath;
				var target = [options.destination, file].join('/');
				
				files.push(new File(source, target));
			});
			
			return files || [];
		}
		/**
		 * Responsible for copying all files to a destination directory.
		 * @param {Array<File>} all files to copy
		 */
		function copyFiles(files) {
			if (!Array.isArray(files)) {
				throw new Error('File parameter must be a Array<File>');
			}
			
			files.forEach(function (file) {
				_copyFile(file.getSource(), file.getTarget());
			});
		}
		
		// Public module methods.
		return {
			files: getFilesToCopy,
			copy: copyFiles
		}
	}

};
