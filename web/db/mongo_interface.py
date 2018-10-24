import pymongo
import json
from bson import ObjectId, json_util


class MongoApi(object):

    def __init__(self, url='', user='', password=''):
        self.url = url
        self.user = user
        self.password = password
        self.db = ''
        self.products = ''

    def connect(self):
        try:
            conn = pymongo.MongoClient(self.url, username=self.user, password=self.password, serverSelectionTimeoutMS=2000)
            conn.server_info()
            return conn
        except pymongo.errors.PyMongoError as e:
            return None

    def get_products(self, conn):
        try:
            self.db = conn.shop
            self.products = self.db.products
            if self.products.count_documents({}):
                prod = self.db.products.find()
                return prod
        except pymongo.errors.PyMongoError as e:
            print(e)
            return False
        except AttributeError as e:
            print(e)
            return False

    def add_product(self, product):
        try:
            document_id = self.db.products.insert_one(product)
            inserted = self.products.find_one({'_id': ObjectId(document_id.inserted_id)})
            return json_util.dumps(inserted)
        except pymongo.errors.PyMongoError as e:
            print(e)
            return False
        except AttributeError as e:
            print(e)
            return False

    def update_product(self, product):
        try:
            product_id = {"_id": ObjectId(product['id'])}
            product.pop('id')
            update = self.db.products.update(product_id, {'$set': product})
            return update['nModified']
        except pymongo.errors.PyMongoError as e:
            print(e)
            return False
        except AttributeError as e:
            print(e)
            return False
        except KeyError as e:
            print(e)
            return False

    def remove_product(self, objectId):
        try:
            self.db.products.delete_one({'_id': ObjectId(objectId['id'])})
            return self.db.products.count_documents({})
        except pymongo.errors.PyMongoError as e:
            print(e)
            return False
        except AttributeError as e:
            print(e)
            return False
