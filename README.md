# Womerton Farm Website

## Stack

* Python 2.7 on the Google App Engine https://cloud.google.com/appengine/docs/standard/python/download
* Bootstrap v3.3.7 http://getbootstrap.com
* Colour scheme based on \web_app\static\img\wrekin_beyond.jpg using http://www.lavishbootstrap.com/
* jinja2 templating engine http://jinja.pocoo.org/

To run on Cloud9 (https://c9.io) use:

    ```python ./google_appengine/dev_appserver.py ./workspace/web_app/ --host=0.0.0.0  ```
    
To run on Cloud9 with access to the admin interface use:
    
    ```python ../google_appengine/dev_appserver.py ../workspace/web_app/ --host=0.0.0.0 --port=8080 --admin_host=0.0.0.0 --admin_port=8081```

## Install GAE on C9

* Alt-T
* cd ..
* wget https://storage.googleapis.com/appengine-sdks/featured/google_appengine_1.9.57.zip
* unzip google_appengine_1.9.57.zip
* rm google_appengine_1.9.57.zip 
