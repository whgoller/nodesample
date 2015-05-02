Getting Started
===============

Thank you for downloading this project. The project is self documenting,
but you need enough information to get started, which is the purpose of
this readme.

Do This First
-------------

There are a few things you will need to get started:

1.  If you do not have Node.js on your computer, you'll need to download
    and install it. You can do that by going to [nodejs.org/download](http://nodejs.org/download).
2.  You will also need Bower to install a few other components for your
    app. Once you have Node.js installed, it is pretty easy:
        npm install -g bower
3.  The application uses MongoDB for storing blogs. You'll need to
    install MongoDB. [This page shows you how](http://docs.mongodb.org/manual/installation/).
4.  Create a new directory for your project and move all the downloaded
    project files to that directory.
5.  Now you can install all of the node modules and bower components.
    You can by running these commands in your terminal in the same
    directory where you moved your files.
        npm install
        bower install

Now You Can Run The App
-----------------------

Once you have all the modules installed, you can run the app:

1.  Still in terminal located at the directory where the files are
    located, you can start the local MongoDB database (local to this
    application):
        mongod --dbpath ./lib/db
2.  Open a second terminal window in the same directory.
3.  We installed nodemon, a utility that will automatically relaunch the
    Node app if there are any changes to your Node app. It can also
    watch specific directories:
        nodemon app.js
4.  Click on [this link](http://localhost:3000) to open a browser window
    to show the app running.
5.  There is also a Grunt watch function created to convert sass files to css.
    Run that in a third terminal window:
        grunt 

*** You are now up and running! ***

Note the link "blog mgr" in the footer. That will take you to the Blog
Editor. You'll need to create a new user and password, then log into the
editor.
