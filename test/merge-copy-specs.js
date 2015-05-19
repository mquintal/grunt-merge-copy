describe('merge-copy tests', function() {
	var grunt = require('grunt');
	var fs = require('fs');
	var expect = require('chai').expect;
	var mergeCopy = require('../lib/merge-copy')(grunt);
	var mockOtions;
	var merge;
	
	mockOtions = {
		destination: 'test/mockProject/target',
		directories: ['test/mockProject/app/clientA', 'test/mockProject/app/clientB'],
	};
	
	describe('successfull cases', function() {
		
		beforeEach(function() {
			merge = mergeCopy(mockOtions);
		});
		
		it('should merge files form two directories', function() {
			var files = merge.files();
			
			expect(files).to.have.a.property('index.html');
			expect(files).to.have.a.property('user-list.html');
		});
		
		it('should merge files and copy them (A->B)', function() {
			var files = merge.files();
			var indexFileContent = '';
			
			merge.copy(files);
			
			indexFileContent = fs.readFileSync('test/mockProject/target/index.html');
			indexFileContent = indexFileContent.toString();
			
			expect(files).to.have.a.property('index.html');
			expect(files).to.have.a.property('user-list.html');
			expect(grunt.file.exists('test/mockProject/target/index.html')).equal(true);
			expect(grunt.file.exists('test/mockProject/target/user-list.html')).equal(true);
			expect(indexFileContent).equal('<h1>clientB<h1>');
		});
		
		it('should merge files and copy them (B->A)', function() {
			mockOtions.directories = ['test/mockProject/app/clientB', 'test/mockProject/app/clientA'];
			var merge = mergeCopy(mockOtions);
			var files = merge.files();
			var indexFileContent = '';
			
			merge.copy(files);
			
			indexFileContent = fs.readFileSync('test/mockProject/target/index.html');
			indexFileContent = indexFileContent.toString();
			
			expect(files).to.have.a.property('index.html');
			expect(files).to.have.a.property('user-list.html');
			expect(grunt.file.exists('test/mockProject/target/index.html')).equal(true);
			expect(grunt.file.exists('test/mockProject/target/user-list.html')).equal(true);
			expect(indexFileContent).equal('<h1>clientA<h1>');
		});
		
	});
	
});