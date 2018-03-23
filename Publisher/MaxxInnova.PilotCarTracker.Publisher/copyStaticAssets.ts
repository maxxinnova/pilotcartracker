var shell = require("shelljs");

shell.cp("-R", "src/public/js/lib", "public/js/");
shell.cp("-R", "src/public/fonts", "public/");
shell.cp("-R", "src/public/images", "public/");
