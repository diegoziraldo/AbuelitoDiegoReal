#Link=https://www.youtube.com/watch?v=MvVqjQqSdM4

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import DateTime, Column, Integer, LargeBinary
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql.expression import func
import datetime
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:1234@localhost/AbuelitoDiego'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


CORS(app)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})


db = SQLAlchemy(app)
ma = Marshmallow(app)
################ MODELO DE CLIENTES #####################################
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

################ MODELO DE PRODUCTOS ####################################
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
    image_url = db.Column(db.String(255)) 
    brand = db.Column(db.String(100))
    unit = db.Column(db.String(50))
        
    
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

################ MODELO DE CATEGORIAS ####################################
class Categories(db.Model):
    __tablename__ = 'Categories' 
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(70))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
        
    
    def __init__(self, name):
        self.name = name

################ MODELO DE TAREAS ######################################
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(70), unique=True)
    description = db.Column(db.String(100))

    def __init__(self, title, description):
        self.title = title
        self.description = description

################ MODELO DE TEST ######################################
class Borrar(db.Model):
    __tablename__ = 'borrar' 
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(70))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
  
############# CON ESTE FRAGMENTO VAMOS A GENERAR TABLAS EN LA BASE DE DATOS ########################################
with app.app_context():
    db.create_all()


#################### ESQUEMA DEL CLIENTE #################################
class ClientSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'lastName', 'created_at', 'updated_at', 'address', 'city', 'tel', 'email')

#################### ESQUEMA DEL PRODUCTO #################################
class ProductSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'description', 'created_at', 'updated_at', 'category', 'price', 'stock', 'sku', 'image_url', 'brand', 'unit')

#################### ESQUEMA DE LA CATEGORIA #################################
class CategorySchema(ma.Schema):
    class Meta:
        fields = ('id', 'name')
        
#################### ESQUEMA DE BORRAR #################################  
class BorrarSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name')
        
#################### ESQUEMA DE LA TAREA #################################
class TaskSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'description')

#Guardamos los esquemas en variables.
client_schema = ClientSchema()
clients_schema = ClientSchema(many=True)

product_schema = ProductSchema()
products_schema = ProductSchema(many=True)

category_schema = ProductSchema()
categories_schema = ProductSchema(many=True)

task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)

borrar_schema = BorrarSchema()
borrars_schema = BorrarSchema(many=True)

################## ENVIO DEL CLIENTE ###################################
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

################## PEDIDO DEL CLIENTE ###################################

@app.route('/clients', methods=['GET'])
def get_clients():
  all_clients = Clients.query.all()
  result = clients_schema.dump(all_clients)
  return jsonify(result)

#################### ENVIO DE PRODUCTO #################################

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

  return product_schema.jsonify(new_product)

################## PEDIDO DEL PRODUCTO ###################################

@app.route('/products', methods=['GET'])
def get_products():
  all_products = Products.query.all()
  result = products_schema.dump(all_products)
  return jsonify(result)     

@app.route('/products/<int:id>', methods=['GET'])
def get_product(id):
  product = Products.query.get(id)
  if product:
    return product_schema.jsonify(product)
  else:
    return({'message':'Producto no entontrado'}),404
  
################## MODIFICACION DEL PRODUCTO ###################################

@app.route('/products/<int:id>', methods=['PUT'])
def update_product(id):
  product =  Products.query.get(id)
  if not product:
    return jsonify({'message':'Producto no encontrado'}),404
  
  data = request.json
  
  # Actualizar los campos del producto
  if 'name' in data:
    product.name = data['name']
  if 'description' in data:
    product.description = data['description']
  if 'category' in data:
    product.category = data['category']
  if 'price' in data:
    product.price = data['price']
  if 'stock' in data:
    product.stock = data['stock']
  if 'sku' in data:
    product.sku = data['sku']
  if 'image_url' in data:
    product.image_url = data['image_url']
  if 'brand' in data:
    product.brand = data['brand']
  if 'unit' in data:
    product.unit = data['unit']

  try:
    db.session.commit()
    return jsonify({'message': 'Producto actualizado con éxito'}), 200
  except Exception as e:
    db.session.rollback()
    return jsonify({'message': 'Error al actualizar el producto', 'error': str(e)}), 500

#################### ENVIO DE CATEGORIAS #################################

@app.route('/category', methods=['POST'])
def create_category():
  #Aca estoy guardando en una variable lo que llega del json.
  name = request.json['name']
  print(f"Valor recibido para la categoría: {name} ({type(name)})")
  
  #Aca estoy creando una instancia de la clase Task, y pasandole por parametros los valores que guarde anteriormente
  new_category = Categories(name)
  
  #Aca estoy guardando en la base de datos lo que guarde anteriormente
  db.session.add(new_category)
  db.session.commit()

  return product_schema.jsonify(new_category)

################## PEDIDO DE LA CATEGORIA ###################################

@app.route('/category', methods=['GET'])
def get_categories():
  all_categories = Categories.query.all()
  result = categories_schema.dump(all_categories)
  return jsonify(result)     

#################### ENVIO DE TAREAS #################################

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

#################### PEDIDO DE TAREAS #################################

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
