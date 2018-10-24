from pyramid.view import view_config
# from pyramid.response import Response
from pyramid.httpexceptions import HTTPFound
from web.db.mongo_interface import MongoApi
import json
import os

mongodb_url = os.getenv('MONGO_DB_URL', '127.0.0.1')
mongodb_obj = MongoApi(mongodb_url)
conn = None


@view_config(route_name='home', renderer="templates/home.pt")
def home(request):
    global conn
    if conn is None:
        conn = mongodb_obj.connect()
    products = mongodb_obj.get_products(conn)
    if products is False:
        return {'products': None, 'dbErr': 'Getting database records failed. Check database connection'}
    return {'products': products, 'dbErr': None}


@view_config(route_name='add', request_method='GET')
def add_product_get(request):
    return HTTPFound(location='/')


@view_config(route_name='add', renderer='json', request_method='POST')
def add_product(request):
    product = mongodb_obj.add_product(request.json_body)
    if product is False:
        return {'dbErr': 'Adding record failed. Check database connection'}
    return json.loads(product)


@view_config(route_name='update', request_method='GET')
def update_product_get(request):
    print('Getting')
    return HTTPFound(location='/')


@view_config(route_name='update', renderer='json', request_method='POST')
def update_product(request):
    product = mongodb_obj.update_product(request.json_body)
    if product is False or product == 0:
        return {'dbErr': 'Updating record failed. Check database connection'}
    return {'noUpdate': product}


@view_config(route_name='remove', request_method='GET')
def remove_product_get(request):
    return HTTPFound(location='/')


@view_config(route_name='remove', renderer='json', request_method='POST')
def remove_product(request):
    product_id = request.json_body
    doc_count = mongodb_obj.remove_product(product_id)
    if doc_count is False:
        return {'dbErr': 'Deleting record failed. Check database connection'}
    return {'count': doc_count}
