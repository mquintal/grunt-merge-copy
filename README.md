# grunt-merge-copy v0.0.7

> Merge two directories.



## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-merge-copy --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-merge-copy');
```



## Copy task
_Run this task with the `grunt merge-copy` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.
### Options

#### common
Type: `String`
Default: `common`

This option represents common folder name. 

#### specific
Type: `String`
Default: `specific`

This option represents specific folder name. 

#### encoding
Type: `String`  
Default: `grunt.file.defaultEncoding`

The file encoding to copy files with.

### Usage Examples

Assuming you have following project structure:


```shell
└── app
    └── base 
    	├── apple.html
    	├── berry.html
    └── clientx
        ├── apple.html
├── Gruntfile.js
```

Applying following merge-copy configuration:

```js
 'merge-copy': {
	options: {
		common: 'base'
		specific: 'clientx'
	},
	main: {
		files: [ { src: 'app', dest: 'dist' } ]
	}
 }
```

Result:

```shell
└── app
    └── base 
    	├── apple.html
    	├── berry.html
    └── clientx
        ├── apple.html
└── dist
    ├── apple.html ( file from clientx directory )
    ├── berry.html	
├── Gruntfile.js
```

