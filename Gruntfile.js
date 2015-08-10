'use strict';

module.exports = function(grunt) {
	
	/**
	 * Set project info
	 */
	var project = {
		imagePath: 'img',
		lessPath: 'less/',
		cssPath: 'css/',
		jsPath: 'js',
		minCss: 'css/styles.min.css',
		watchFiles: ['less/*', 'css/*', 'js/*']
	};

	grunt.initConfig({
		
		/**
		 * Load package info variables from package.json
		 */
		pkg: grunt.file.readJSON('package.json'),
		
		/**
		 * Project banner
		 * Dynamically appended to CSS/JS files
		 * Inherits text from package.json
		 */
		tag: {
			banner: '/*!\n' +
							' * <%= pkg.name %>\n' +
							' * <%= pkg.url %>\n' +
							' * @author <%= pkg.author %>\n' +
							' * @version <%= pkg.version %>\n' +
							' * <%= pkg.license %> licensed.\n' +
							' */\n'
		},
		
		/**
		 * Configuring Grunt tasks
		 * http://gruntjs.com/configuring-tasks
		 */
		less: {
			development: {
				options: {
					compress: true,
					
				},
				expand: true,
				cwd: project.lessPath,
				src: "*.less",
				dest: project.cssPath,
				ext: ".css",
			},
		},
		
		cssmin: {
			production: {
				files: {
					project.minCss : ["css/*.css", "!" + project.minCss]
				}
			}
		},
		
		watch: {
			src: {
				files: project.watchFiles,
				tasks: ['default']
			}
		}
	});
	
	/**
	 * Load plugins
	 * Remember to add these plugins to devDependencies in package.json
	 */
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	/**
	 * Create/Define grunt tasks commands to run
	 *
	 * Register task specific command
	 *	grunt.registerTask('development', ['less:development']);
	 * To run it:
	 *	> grunt development
	 *
	 * http://gruntjs.com/creating-tasks
	 */
	grunt.registerTask('default', ['less']);
	grunt.registerTask('release', ['less', 'cssmin:production']);
	
	grunt.event.on('watch', function(action, filepath) {
		grunt.log.writeln(filepath + ' has been ' + action);
	});
};