---
layout: default
title: Setup for Developers on Linux
---

1. Set up an environment variable which returns the version of Linux you are using.

    export CLOUD_SDK_REPO="cloud-sdk-$(lsb_release -c -s)"

1. Add the Cloud SDK distribution URI as a package source

    echo "deb http://packages.cloud.google.com/apt $CLOUD_SDK_REPO main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list

1. Import the Google Cloud public key using curl

    curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -

1. Update and then install the Google Cloud SDK

    sudo apt-get update && sudo apt-get install google-cloud-sdk

1. The Cloud SDK doesn't come with any of the Python tools to use with the App Engine so these packages have to be installed individually.

    sudo apt-get install google-cloud-sdk-app-engine-python
    sudo apt-get install google-cloud-sdk-app-engine-python-extras
    sudo apt-get install google-cloud-sdk-datastore-emulator

1. Ensure that virtualenv and the wrapper is available, if not install them.

    pip list | grep "virtual"

	pip install virtualenv
	pip install virtualenvwrapper

1. Use the virtualevn or if it is not available, create a virtual environment for running the web application.

    lsvirtualenv -b
    workon womerton

    mkvirtualenv womerton

1. Install the supporting packages

    pip install -t ./web_app/lib -r ./web_app/requirements.txt

1. Run the application using the Google App Engine

    dev_appserver.py ./web_app/app.yaml
