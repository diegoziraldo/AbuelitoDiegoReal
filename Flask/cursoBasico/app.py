from flask import Flask, render_template, request

app = Flask(__name__)

@app.errorhandler(404)
def err_handler(e):
  return render_template('404.html')


@app.route('/', defaults={'nom':'Usuario Desconocido'})
@app.route('/<nom>')
def index(nom):
  nombre = nom
  nombres = ['Pepe', 'Maria', 'Pedra']
  dic = {
    'names' : ['Ileana', 'Marisol', 'Florencia'],
    'ages' : [35, 33, 28]
  }
  return render_template('index.html', name = nombre, names=nombres, values = dic)

@app.route('/clientes', defaults={'cli': 'Cliente Desconocido', 'pro':'Producto Desconocido'})
@app.route('/clientes/<cli>/<pro>')
def clientes(cli, pro):
  cliente = cli
  producto = pro
  return render_template('clientes.html', client = cliente, prod = producto)

@app.route('/register', methods=['GET'])
def register():
  user = {
    'name':'',
    'email':''
  }
  if request.args:
    user['name'] = request.args['nombre']
    user['email'] = request.args['correo']
  return render_template('register.html', usuario = user)





if __name__ == '__main__':
  app.run()