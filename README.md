# Gulp build file

A generic gulp build file.

## Usage
The script knows three build stages:

1. dev

2. test

3. production

Run any of the build stages using:

`gulp dev --your-project-source-name`

Projects are defined inside a projects folder inside the source folder. Mulptiple projects may be called at once.

**Folder structure, source folder**

A typical project structure looks like:

|-- config.json

|-- gulp-plugins.js

|-- gulpfile.js

|-- package.json

|-- source

|-- |-- sass

|-- |-- projects

|-- |-- |-- your-project-source-name

**Folder structure, build folder**

Because projects may be nested inside other projects (for example a theme or template for Wordpress or Joomla), the project files may be moved into a configurable path inside the config.json.

Individual projects are moved into a build folder:

|-- build

|-- |-- your-project-build-name


## Install
Simply place the files into the root of your project. If necessary, add your dependencies to the package.json file.

## Config
To start using the script, you need to update the uutput variable in the config.json:

'"output": {
    "styleguide": "build/styleguide",
    "brickson": "build/www",
    "teemr": "build/teemr"
  },'
