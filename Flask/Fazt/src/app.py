#Link=https://www.youtube.com/watch?v=MvVqjQqSdM4

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import DateTime, Column, Integer, LargeBinary
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql.expression import func
import datetime
from flask_marshmallow import Marshmallow

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:1234@localhost/AbuelitoDiego'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

class Clients(db.Model):
    __tablename__ = 'Clients' 
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(70))
    lastName = db.Column(db.String(100))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    address = db.Column(db.String(100))
    city = db.Column(db.String(100))
    tel = db.Column(db.Integer, unique=True)
    email = db.Column(db.String(100))
    
    def __init__(self, name, lastName,address,city,tel,email):
        self.name = name
        self.lastName = lastName
        self.address = address
        self.city = city
        self.tel = tel
        self.email = email

#####################################################

class Products(db.Model):
    __tablename__ = 'Products' 
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(70))
    description = db.Column(db.String(100))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    category = db.Column(db.String(100))
    price = db.Column(db.Integer)
    stock = db.Column(db.Integer)
    sku = db.Column(db.String(100))
    image_url = db.Column(LargeBinary)
    brand = db.Column(db.String(100))
    unit = db.Column(db.Integer)
        
    
    def __init__(self, name,description,category,price,stock,sku,image_url,brand,unit):
        self.name = name
        self.description = description
        self.category = category
        self.price = price
        self.stock = stock
        self.sku = sku
        self.image_url = image_url
        self.brand = brand
        self.unit = unit



#####################################################

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(70), unique=True)
    description = db.Column(db.String(100))

    def __init__(self, title, description):
        self.title = title
        self.description = description


#####################################################


# Mover db.create_all() dentro de un contexto de aplicación
with app.app_context():
    db.create_all()


#####################################################


class ClientSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'lastName', 'created_at', 'updated_at', 'address', 'city', 'tel', 'email')

class ProductSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'description', 'created_at', 'updated_at', 'category', 'price', 'stock', 'sku', 'image_url', 'brand', 'unit')

class TaskSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'description')

client_schema = ClientSchema()
clients_schema = ClientSchema(many=True)

product_schema = ProductSchema()
products_schema = ProductSchema(many=True)

task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)


#####################################################


@app.route('/clients', methods=['POST'])
def create_client():
  #Aca estoy guardando en una variable lo que llega del json.
  name = request.json['name']
  lastName = request.json['lastName']
  address = request.json['address']
  city = request.json['city']
  tel = request.json['tel']
  email = request.json['email']
  
  #Aca estoy creando una instancia de la clase Task, y pasandole por parametros los valores que guarde anteriormente
  new_client = Clients(name, lastName,address,city,tel,email)
  
  #Aca estoy guardando en la base de datos lo que guarde anteriormente
  db.session.add(new_client)
  db.session.commit()

  return client_schema.jsonify(new_client)


#####################################################


@app.route('/products', methods=['POST'])
def create_product():
  #Aca estoy guardando en una variable lo que llega del json.
  name = request.json['name']
  description = request.json['description']
  category = request.json['category']
  price = request.json['price']
  stock = request.json['stock']
  sku = request.json['sku']
  image_url = request.json['image_url']
  brand = request.json['brand']
  unit = request.json['unit']

          
  
  #Aca estoy creando una instancia de la clase Task, y pasandole por parametros los valores que guarde anteriormente
  new_product = Products(name, description,category,price,stock,sku,image_url,brand,unit)
  
  #Aca estoy guardando en la base de datos lo que guarde anteriormente
  db.session.add(new_product)
  db.session.commit()

  return client_schema.jsonify(new_product)



#####################################################



@app.route('/tasks', methods=['POST'])
def create_task():
  #Aca estoy guardando en una variable lo que llega del json.
  title = request.json['title']
  description = request.json['description']
  
  #Aca estoy creando una instancia de la clase Task, y pasandole por parametros los valores que guarde anteriormente
  new_task = Task(title, description)
  
  #Aca estoy guardando en la base de datos lo que guarde anteriormente
  db.session.add(new_task)
  db.session.commit()

  return task_schema.jsonify(new_task)


@app.route('/tasks', methods=['GET'])
def get_tasks():
  all_tasks = Task.query.all()
  result = tasks_schema.dump(all_tasks)
  return jsonify(result)


@app.route('/tasks/<id>', methods=['GET'])
def get_task(id):
  task = Task.query.get(id)
  return task_schema.jsonify(task)


#####################################################

if __name__ == '__main__':
    app.run(debug=True)
