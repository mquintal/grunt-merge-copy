# grunt-merge-copy

## Description

Merge two or more directories.
Files can be optionally filtered using a glob pattern.


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

Task targets and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.


### Options


#### destination
Type: `String`

Specifies the destination directory of the merge operation.


#### directories
Type: `Array`

An array of directories that should me merged. Order is important!


#### encoding
Type: `String`
Default: `grunt.file.defaultEncoding`

The file encoding to copy files with.


#### patterns
Type: `String | Array`
Default: `**/*`

Optionally filter the files by one or more glob patterns.

#### globOptions
Type: `Object`
Default: `{ nonull: false, dot: true }`

Optionally set some glob options.


### Usage Examples

Assuming you have following project structure:


```shell
└── app
    └── base 
        ├── apple.html
        ├── berry.html
    └── clientx
        ├── apple.html
        ├── banana.html
├── Gruntfile.js
```

Applying following merge-copy configuration:

```js
'merge-copy': {
    main: {
        options: {
            destination: 'dist',
            directories: [ 'app/base/', 'app/clientx' ]
        },
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
        ├── banana.html
└── dist
    ├── apple.html ( file from clientx directory )
    ├── berry.html
    ├── banana.html
├── Gruntfile.js
```

## Release History

__0.2.1__
  
  * Implement tests to ensure that module has the correct behaviour in different situations;
  * Split code to get better organization and to be testable.

__0.2.0__

  * Added support for setting glob options.

__0.1.0__

  * Defined merge-copy task using [node-merge-collect-files](https://github.com/sullinger/node-merge-collect-files).
