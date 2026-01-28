from flask import jsonify,request
from core import app,db
from .models import Product,product_form



@app.route('/product',methods=["GET"])
def get_products():
    products=Product.query.order_by(Product.id.asc()).all()
    product_list=[]
    for product in products:
        product_list.append(product_form(product))
    return jsonify(product_list)

@app.route('/product',methods=["POST"])
def add_product():
    data=request.get_json()
    product=Product(
        name=data.get('name'),
        description=data.get('description'),
        stars=data.get('stars',0)
    )
    db.session.add(product)
    db.session.commit()
    return jsonify(product_form(product))



@app.route('/product/<string:id>/rating',methods=["PUT"])
def update_product(id):
    data=request.get_json()
    product=Product.query.filter_by(id=id).first()
    product.stars=data['stars']
    db.session.commit()
    return jsonify({'msg':'Rating updated'})


