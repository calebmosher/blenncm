var gulp = require("gulp"),
	browserify = require("browserify"),
	source = require("vinyl-source-stream"),
	rename = require("gulp-rename"),
	notify = require("gulp-notify"),
	sass = require("gulp-sass");



// HTML
gulp.task("html", function() {
	return gulp.src("src/html/*.html")
		.pipe(rename(function(path) {
			path.dirname = path.basename === "index" ? "" : path.basename;
			path.basename = "index";
		}))
		.pipe(gulp.dest("public"))
		.pipe(notify("Finished HTML"));
});



// Assets
gulp.task("assets", function () {
	return gulp.src("src/assets/*")
		.pipe(gulp.dest("public/assets"))
		.pipe(notify("Finished Assets"));
});


// CSS
gulp.task("sass", function() {
	return gulp.src("src/scss/*.scss")
		.pipe(sass())
		.pipe(rename("main.built.css"))
		.pipe(gulp.dest("public/dist/built"))
		.pipe(notify("Finished Sass"));
});

gulp.task("scss", ["sass"]);
gulp.task("css", ["sass"]);



// Javascript
gulp.task("browserify", function() {
    return browserify("src/js/index.js")
		.bundle()
		.pipe(source("main.built.js"))
		.pipe(gulp.dest("public/dist/built"))
		.pipe(notify("Finished Browserify"));
});

gulp.task("js", ["browserify"]);



// Local Server
gulp.task("server", function() {
	// connect.server({
	// 	port: "9000"
	// });
});



// Default
gulp.task("default", ["html", "assets", "browserify", "sass"]);

gulp.task("watch", ["default"], function() {
	gulp.watch("src/js/*.js", ["browserify"]);
	gulp.watch("src/scss/*.scss", ["sass"]);
	gulp.watch("src/html/*.html", ["html"]);
	gulp.watch("src/assets/*", ["assets"]);
});
