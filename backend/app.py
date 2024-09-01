from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///friends.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

frontend_dir = os.path.join(os.getcwd(), "..", "frontend")
dist_dir = os.path.join(frontend_dir, "dist")

@app.route("/", defaults={"filename": ""})
@app.route("/<path:filename>")
def index(filename):
  if not filename:
    filename = "index.html"
  return send_from_directory(dist_dir, filename)

import routes

with app.app_context():
  db.create_all()

# TODO: Update this file for deployment

if __name__ == "__main__":
  app.run(debug=True)