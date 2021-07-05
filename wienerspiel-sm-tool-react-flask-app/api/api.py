# Flask API Project
from flask import Flask
import time

app = Flask(__name__)

@app.route('/time') # /time URL
def get_current_time():
    return {'time': time.time()} # return response