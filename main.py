from flask import Flask, render_template, request, jsonify, current_app, send_from_directory, send_file
from flask_bootstrap import Bootstrap
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from morse import ConvertToMorse
import os


app = Flask(__name__)
app.config['WTF_CSRF_ENABLED'] = False
app.config['UPLOAD_FOLDER'] = "download"
Bootstrap(app)

class MorseForm(FlaskForm):
    input = StringField('input', validators=[DataRequired()])
    converted = StringField('output')

@app.route("/", methods=['GET', 'POST'])
def home():
    form = MorseForm()
    return render_template('index.html', form = form)

@app.route('/morse', methods=['GET', 'POST'])
def convert_to_morse():
    converter = ConvertToMorse()
    string = request.args['test[0][value]']
    converted = converter.convert_to_morse(string)
    return jsonify(converted)

@app.route('/downloads/<path:filename>', methods = ['POST', 'GET'])
def download(filename):
    uploads = os.path.join(current_app.root_path, app.config['UPLOAD_FOLDER'])
    return send_from_directory(directory=uploads, filename=filename, as_attachment = True)

if __name__ == '__main__':
    app.run(debug = True)
