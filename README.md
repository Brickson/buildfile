# Gulp build file

A generic gulp build file.

## Usage
The script knows three build stages:

1. dev
2. test
3. production

Run any of the build stages using:
```
gulp dev --your-project-source-name
```
Projects are defined inside a projects folder inside the source folder. Mulptiple projects may be called at once.

**Folder structure, source folder**

A typical project structure looks like:
```
|-- config.json
|-- gulp-plugins.js
|-- gulpfile.js
|-- package.json
|-- source
|-- |-- sass
|-- |-- projects
|-- |-- |-- your-project-source-name
```
**Folder structure, build folder**

Because projects may be nested inside other projects (for example a theme or template for Wordpress or Joomla), the project files may be moved into a configurable path inside the config.json.

Individual projects are moved into a build folder:
```
|-- build
|-- |-- your-project-build-name
```

## Install
```
sudo gem install scss-lint
npm install
```
Simply place the files into the root of your project. If necessary, add your dependencies to the package.json file.

## Config
To start using the script, you need to update the output variable in the config.json:
```
"output": {
    "styleguide": "build/styleguide",
    "your-project-source-name": "build/your-project-build-name"
  },
```

A real live example:
```
"output": {
    "styleguide": "build/styleguide",
    "brickson.nl": "build/www"
  },
```
To deploy the brickson.nl project to production, run:
```
gulp production --brickson.nl
```

## Advanced
When the script encounters a docblock.js or a docblock.css file in the project folder, it will prepend its contents to the respective concatenated, minified and uglified scripts and stylesheets.


---

**License**

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org>
