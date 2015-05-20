describe('merge-copy tests', function() {
	var grunt = require('grunt');
	var fs = require('fs');
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
			
			expect(files).to.have.a.property('index.html');
			expect(files).to.have.a.property('user-list.html');
			expect(files).to.have.a.property('somefolder/somefile.html');
		});
		
		it('should merge files and copy them (A->B)', function() {
			var files = merge.files();
			var indexFileContent = '';
			var somefileContent = '';
			
			merge.copy(files);
			
			indexFileContent = fs.readFileSync(TARGET_DIR + 'index.html');
			somefileContent =  fs.readFileSync(TARGET_DIR + 'somefolder/somefile.html');
			
			expect(files).to.have.a.property('index.html');
			expect(files).to.have.a.property('user-list.html');
			expect(grunt.file.exists(TARGET_DIR + 'index.html')).to.be.true;
			expect(grunt.file.exists(TARGET_DIR + 'user-list.html')).to.be.true;
			expect(indexFileContent.toString()).to.contains('clientB');
			expect(somefileContent.toString()).to.contains('clientB');
		});
		
		it('should merge files and copy them (B->A)', function() {
			mockOtions.directories = ['test/mockProject/app/clientB', 'test/mockProject/app/clientA'];
			var merge = mergeCopy(mockOtions);
			var files = merge.files();
			var indexFileContent = '';
			var somefileContent = '';
			
			merge.copy(files);
			
			indexFileContent = fs.readFileSync(TARGET_DIR + 'index.html');
			somefileContent =  fs.readFileSync(TARGET_DIR + 'somefolder/somefile.html');
			
			expect(files).to.have.a.property('index.html');
			expect(files).to.have.a.property('user-list.html');
			expect(grunt.file.exists(TARGET_DIR + 'index.html')).to.be.true;
			expect(grunt.file.exists(TARGET_DIR + 'user-list.html')).to.be.true;
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
			
			expect(files).to.have.a.property('index.html');
			expect(files).to.have.a.property('user-list.html');
			expect(files).not.to.have.a.property('somefolder/somefile.html');
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
			
			expect(files).to.have.a.property('index.html');
			expect(files).not.to.have.a.property('user-list.html');
			expect(files).to.have.a.property('somefolder/somefile.html');
		});
		
	});
	
});