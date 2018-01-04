# Womerton Farm Website

## Stack

Not on Github Pages because the GitHub repo is public, all its assets are public.  There is no option for setting hidden variables for the email address or reCapture.

* Python 2.7 on the Google App Engine https://cloud.google.com/appengine/docs/standard/python/download
* Bootstrap v3.3.7 http://getbootstrap.com
* Colour scheme based on \web_app\static\img\wrekin_beyond.jpg using http://www.lavishbootstrap.com/
* jinja2 templating engine http://jinja.pocoo.org/

To run on Cloud9 use:

    ``` python ../google_appengine/dev_appserver.py ./web_app/ --enable_host_checking=false ```
    
To run on Cloud9 with access to the admin interface use:
    
    ``` python ../google_appengine/dev_appserver.py ./web_app/ --enable_host_checking=false --admin_port=8081 ```

## Install or Update GAE on C9

* Alt-T
* cd ..
* rm -r google_appengine
* wget https://storage.googleapis.com/appengine-sdks/featured/google_appengine_1.9.65.zip
* unzip google_appengine_1.9.65.zip
* rm google_appengine_1.9.65.zip 
