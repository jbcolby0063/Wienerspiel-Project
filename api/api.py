# Flask API Project
from flask import Flask, render_template
from fbOverall import fb_x, fb_y, ig_y
from igOverall import reach_x, reach_y, follower_x, follower_y
import firebase_connection
import fb_post_analytics
import insta_post
from datetime import datetime
import schedule
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

@app.route("/analytics") #used in TotalViews.js and FacebookOverall.js
def analytics():
    """Returns data to plot on FacebookOverall.js and TotalViews.js"""
    return {'engagement':fb_post_analytics.get_fb_weekly_page_views_total(),
            'impressions':fb_post_analytics.get_fb_page_impressions_by_age_gender_unique(),
            'reach_x_labels':reach_x, 'reach_y_labels':reach_y, 'follower_x_labels':follower_x, 'follower_y_labels':follower_y,
            'fb_x_labels':fb_x, 'fb_y_labels':fb_y, 'ig_y_labels':ig_y}
    #What table ID to use above? What user? need for each post?







'''
Response to clicking on post card
- Frond end will show the information and charts. Retrieve information from firebase
- Backend will retrieve data for that specific post from each of the platforms. Add information to the firebase(for specific post)
'''


if __name__ == "__main__":
    app.run()
