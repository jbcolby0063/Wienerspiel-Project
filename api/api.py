# Flask API Project
from flask import Flask, render_template, redirect, url_for, render_template, request
from fbOverall import fb_x, fb_y, ig_y
from igOverall import reach_x, reach_y, follower_x, follower_y
import firebase_connection
import fb_post_analytics
import insta_post
from datetime import datetime
import schedule
import time

app = Flask(__name__)

#Organization of the files
'''
Integration of Posting Feature
'''
#untested code MAKE SURE TO COMMENT THIS FUNCTION BEFORE TESTING CODE
@app.route('/analytics', methods=['POST', 'GET'])
def post_to_platform():
    if (request.method == 'POST'):
        try:
            firebase_connection.publish_to_platform() #will get the information from firebase and then publish to the appropriate platforms
        except Exception as e:
            return None
        



'''
Integration of Overall analytics page
'''

@app.route("/analytics") #used in TotalViews.js and FacebookOverall.js
def analytics():
    """Returns data to plot on FacebookOverall.js and TotalViews.js"""
    return {'engagement':fb_post_analytics.get_fb_weekly_page_views_total(),
            'impressions':fb_post_analytics.get_fb_page_impressions_by_age_gender_unique(),
            'reach_x_labels':reach_x, 'reach_y_labels':reach_y, 'follower_x_labels':follower_x, 'follower_y_labels':follower_y,
            'fb_x_labels':fb_x, 'fb_y_labels':fb_y, 'ig_y_labels':ig_y,
            'post_analytics':firebase_connection.post_specific_analytics_list_creator()}
    #What table ID to use above? What user? need for each post?


'''
Integration of Post specific Analytics
'''


if __name__ == "__main__":
    app.run()
