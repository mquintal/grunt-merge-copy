describe('merge-copy tests', function() {
	var grunt = require('grunt');
	var fs = require('fs');
	var path = require('path');
	var expect = require('chai').expect;
	var mergeCopy = require('../lib/merge-copy')(grunt);
	var merge;
	var TARGET_DIR = 'test/mockProject/target/';
	
	
	
	describe('with default patterns (**/*)', function() {
		var mockOtions;
		
		mockOtions = {
			destination: 'test/mockProject/target',
			directories: ['test/mockProject/app/clientA', 'test/mockProject/app/clientB'],
		};
		
		beforeEach(function() {
			merge = mergeCopy(mockOtions);
		});
		
		it('should merge files form two directories', function() {
			var files = merge.files();
			var indexPath = path.normalize(TARGET_DIR + 'index.html');
			var somefilePath = path.normalize(TARGET_DIR + 'somefolder/somefile.html');
			
			expect(files).is.a('Array');
			expect(files.length).to.equal(3);
			expect(files[0].getTarget()).to.be.equal(indexPath);
			expect(files[1].getTarget()).to.be.equal(somefilePath);
		});
		
		it('should merge files and copy them (A->B)', function() {
			var files = merge.files();
			var indexPath = TARGET_DIR + 'index.html';
			var somefilePath = TARGET_DIR + 'somefolder/somefile.html';
			var indexFileContent = '';
			var somefileContent = '';
			
			merge.copy(files);
			
			indexFileContent = fs.readFileSync(indexPath);
			somefileContent =  fs.readFileSync(somefilePath);
			
			expect(grunt.file.exists(indexPath)).to.be.true;
			expect(grunt.file.exists(somefilePath)).to.be.true;
			expect(indexFileContent.toString()).to.contains('clientB');
			expect(somefileContent.toString()).to.contains('clientB');
		});
		
		it('should merge files and copy them (B->A)', function() {
			mockOtions.directories = ['test/mockProject/app/clientB', 'test/mockProject/app/clientA'];
			var merge = mergeCopy(mockOtions);
			var indexPath = path.normalize(TARGET_DIR + 'index.html');
			var somefilePath = path.normalize(TARGET_DIR + 'somefolder/somefile.html');
			var files = merge.files();
			var indexFileContent = '';
			var somefileContent = '';
			
			merge.copy(files);
			
			indexFileContent = fs.readFileSync(indexPath);
			somefileContent =  fs.readFileSync(somefilePath);
			
			expect(grunt.file.exists(indexPath)).to.be.true;
			expect(grunt.file.exists(somefilePath)).to.be.true;
			expect(indexFileContent.toString()).to.contains('clientA');
			expect(somefileContent.toString()).to.contains('clientA');
		});
		
	});
	
	describe('with patterns  equals to *.html', function() {
		var mockOtions;
		
		mockOtions = {
			destination: 'test/mockProject/target',
			directories: ['test/mockProject/app/clientA', 'test/mockProject/app/clientB'],
			patterns: '*'
		};
		
		beforeEach(function() {
			merge = mergeCopy(mockOtions);
		});
		
		it('should merge files form two directories', function() {
			var files = merge.files();
			var indexPath = path.normalize(TARGET_DIR + 'index.html');
			var userListPath = path.normalize(TARGET_DIR + 'user-list.html');
			
			expect(files).is.a('Array');
			expect(files.length).to.equal(2);
			expect(files[0].getTarget()).to.be.equal(indexPath);
			expect(files[1].getTarget()).to.be.equal(userListPath);
		});
		
	});
	
	describe('with patterns  equals to [**/*.html, !**/user-list.html]', function() {
		var mockOtions;
		
		mockOtions = {
			destination: 'test/mockProject/target',
			directories: ['test/mockProject/app/clientA', 'test/mockProject/app/clientB'],
			patterns: ['**/*', '!**/user-list.html']
		};
		
		beforeEach(function() {
			merge = mergeCopy(mockOtions);
		});
		
		it('should merge files form two directories', function() {
			var files = merge.files();
			var indexPath = path.normalize(TARGET_DIR + 'index.html');
			var somefilePath = path.normalize(TARGET_DIR + 'somefolder/somefile.html');
			
			expect(files).is.a('Array');
			expect(files.length).to.equal(2);
			expect(files[0].getTarget()).to.be.equal(indexPath);
			expect(files[1].getTarget()).to.be.equal(somefilePath);
		});
		
	});
	
});