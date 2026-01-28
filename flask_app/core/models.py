from core import db
from uuid import uuid4

def get_uuid():
    return uuid4().hex



class Product(db.Model):
    id=db.Column(db.String(32),primary_key=True,default=get_uuid)
    name=db.Column(db.String(132),nullable=False)
    description=db.Column(db.String(255))
    stars=db.Column(db.Integer,default=0)

    def __init__(self,name,description,stars):
        self.name=name
        self.description=description
        self.stars=stars

def product_form(product):
    return {
        "id":product.id,
        "name":product.name,
        "description":product.description,
        "stars":product.stars
    }