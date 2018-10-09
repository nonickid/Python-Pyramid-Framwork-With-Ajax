# Example of Python Pyramid Web Framework with jQuery/Ajax and MongoDB

## Installation instruction

#### Requirments:

**Following software have to be installed to have Pyramid apps works correctly.**
* **Docker** 
* **Python3**
* **Pip**

##### MongoDB installation

Official MongoDB docker image is used to start database instance
```
$ docker pull mongo:latest
$ docker run -d --name mongodba -p 27017:27017 mongo
```

##### Application installation

```
$ git clone git@github.com:nonickid/pyramid_ajax_example.git web
$ cd web
$ python3 -m venv venv
$ source venv/bin/activate
$ pip install -U pip setuptools
$ python setup.py develop
```

##### To start application
```
$ venv/bin/pserve development.ini
Starting server in PID 42917.
Serving on http://localhost:6543
Serving on http://localhost:6543

```

##### Visit http://localhost:6543


