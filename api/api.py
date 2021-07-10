# Flask API Project
from flask import Flask
import time

app = Flask(__name__)
'''
@app.route('/time') # /time URL
def get_current_time():
    return {'time': time.time()} # return response
'''

#Organization of the files
'''
Response to Post button click
- Front-end: send post information to firebase
- Backend: retrieve post information from firebase and post to the appropriate platforms
- Backend: retieve the post information and store it on firebase
'''




'''
Response to the Analytics button click
- Front end: will show all posts and account analytics. Retrieve information from firebase
- Backend will retrieve data for account analytics and then store onto firebase
'''





'''
Response to clicking on post card
- Frond end will show the information and charts. Retrieve information from firebase
- Backend will retrieve data for that specific post from each of the platforms. Add information to the firebase(for specific post)
'''
