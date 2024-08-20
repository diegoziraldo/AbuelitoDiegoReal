from flask import Flask, render_template 

app = Flask(__name__)

#Filtros personalizados
@app.add_template_filter
def today(date):
  return date.strftime('%Y-%m-%d')

#Funcion personalizada
@app.add_template_global
def repeat(s,n):
  return s*n


from datetime import datetime


@app.route('/')
@app.route('/index')
def index():
  name = 'Diego'
  friends = ['Museta', 'Russo', 'Dani', 'Tripi']
  date = datetime.now()
  return render_template(
    'index.html', 
    name = name, 
    friends = friends, 
    date = date,
    )

@app.route('/hello')
@app.route('/hello/<name>')
@app.route('/hello/<name>/<int:age>')
def hello(name=None, age=None):
  if name == None and age == None:
    return '<h1>Hola Mundo</h1>'
  elif age == None:
    return f'<h1>Hola {name}</h1>'
  else:
    return f'<h1>Hola {name} tenes {age + 1} años</h1>'


#Este código sirve para crear una ruta en una aplicación web (probablemente utilizando Flask) que permite recibir un fragmento de código a través de la URL. El fragmento de código se pasa como un parámetro en la ruta y se devuelve envuelto en una etiqueta HTML   , que se utiliza para mostrar texto que representa código de programación. 
from markupsafe import escape
@app.route('/code/<path:code>')
def code(code):
  return f'<code>{escape(code)}</code>'




if __name__ == '__main__':
    app.run(debug=True)

