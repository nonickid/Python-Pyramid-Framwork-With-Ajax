from pyramid.view import view_config
# from pyramid.response import Response
from web.db.mongo_interface import MongoApi
import json

mongodb_obj = MongoApi('127.0.0.1')
conn = None


@view_config(route_name='home', renderer="templates/home.pt")
def home(request):
    global conn
    if conn is None:
        conn = mongodb_obj.connect()
    products = mongodb_obj.get_products(conn)
    if products is False:
        return {'web': 'Pyramid and Ajax Example', 'products': None,
                'connectionErr': 'Getting database records failed. Check database connection'}
    return {'web': 'Pyramid and Ajax Example', 'products': products, 'connectionErr': None}


@view_config(route_name='add', renderer='json')
def add_product(request):
    product = mongodb_obj.add_product(request.json_body)
    if product is False:
        return {'connectionErr': 'Adding record into database failed. Check database connection'}
    return json.loads(product)


@view_config(route_name='remove', renderer='json')
def remove_product(request):
    product_id = request.json_body
    doc_count = mongodb_obj.remove_product(product_id)
    if doc_count is False:
        return {'connectionErr': 'Deleting record from database failed. Check database connection'}
    return {'count': doc_count}
