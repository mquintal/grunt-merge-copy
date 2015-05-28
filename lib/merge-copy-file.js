var path = require('path');

function File(source, target) {
	
	this.getSource = function() {
		return path.normalize(source) || '';
	}
	
	this.getTarget = function() {
		return path.normalize(target) || '';
	}
	
}

module.exports = File;