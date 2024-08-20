from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:1234@localhost/AbuelitoDiego'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False

db = SQLAlchemy(app)
ma = Marshmallow(app)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/menues')
def menues():
    return render_template('menues.html')

@app.route('/proveedores')
def proveedores():
    return render_template('proveedores.html')

@app.route('/clientes')
def clientes():
    return render_template('clientes.html')

if __name__ == '__main__':
    app.run(debug=True)
