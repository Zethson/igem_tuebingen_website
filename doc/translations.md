# Short Documentation for using Flask-Babel with translate commands

Our Application uses Flask-Babel for translation from en to de and vice versa.

The common approach for creating a translation with Flask-Babel consists of the following steps:

1. Create a message.pot file in the current directory (used as a template for the future translation files) with 
```bash
$ pybabel extract -F babel.cfg -o messages.pot .
```

2. Initialize a translation file for a (new) language using (with its literal as a paramter for the -l option)
```bash
$ pybabel init -i messages.pot -d path/to/your/translations/folder/translations -l
```

3. Compile this file to actual lower level code for usage with 
```bash
$ pybabel compile -d path/to/your/translations/folder/translations
```

# Using translate commands

Since the above commands are kind of cumbersome, we provide a slightly simpler command to use in CLI.
NOTE: You have to set your FLASK_APP variable to the app.py file (set on Windows, otherwise):
```bash
$ export FLASK_APP=igem_tuebingen_website/app.py
```

They can be called via
```bash
$ flask translate [COMMAND] [options]
```

The commands are:
```bash
$ flask translate init [new language literal]

$ flask translate update //this updates the messages.po (translation file) when changes has been made

$ flask translate compile
```
Note that you´ll have to compile every time you made a change (via update/init) in order to get the translation working
On top of that, the messages.pot file will be removed if everything goes fine.

So a typical workflow, if some changes has been made, will look like:

```bash
$ flask translate update 

$ flask translate compile
```

That´s all!

Type
```bash
$ flask translate --help
```

for more information about the different commands.