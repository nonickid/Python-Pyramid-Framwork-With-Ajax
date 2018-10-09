from pyramid.view import view_config
from pyramid.response import Response
from web.db.mongo_interface import MongoApi
import json

mongo_obj = MongoApi('127.0.0.1')
conn = mongo_obj.connect()


@view_config(route_name='home', renderer="templates/home.pt")
def home(request):
    return {'web': 'Pyramid and Ajax Example', 'products': mongo_obj.get_products(conn)}


@view_config(route_name='add', renderer='json')
def add_product(request):
    product = mongo_obj.add_product(request.json_body)
    return json.loads(product)


@view_config(route_name='remove', renderer='json')
def remove_product(request):
    product_id = request.json_body
    doc_count = mongo_obj.remove_product(product_id)
    # response = Response("Failed")
    # response.status_int = 500
    return {'count': doc_count}
