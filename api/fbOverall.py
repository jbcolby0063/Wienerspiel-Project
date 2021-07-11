from flask import Flask, render_template
import firebase
import fb_post_analytics
import insta_post
import pyrebase
from datetime import datetime
import schedule
import time
import json

firebaseConfig = {
  "apiKey": "AIzaSyChx8a649AVw7KwLA9_FMTmw_GaQdcYB7M",
  "authDomain": "wienerspiel-5cbfd.firebaseapp.com",
  "databaseURL": "https://wienerspiel-5cbfd-default-rtdb.firebaseio.com",
  "projectId": "wienerspiel-5cbfd",
  "storageBucket": "wienerspiel-5cbfd.appspot.com",
  "messagingSenderId": "559742840319",
  "appId": "1:559742840319:web:fe2e45287587f468e8cbca"
}

firebase = pyrebase.initialize_app(firebaseConfig)
db = firebase.database()

def update_daily_views():
    """Updates total Views for Instagram and Facebook Daily"""
    db.child("Instagram").child("totalViews").update({datetime.today().strftime("%d-%m-%y"): insta_post.get_insta_account_reach_count()})
    db.child("Facebook").child("totalViews").update({datetime.today().strftime("%d-%m-%y"): fb_post_analytics.get_fb_daily_page_views_total()})


fb_views = db.child("Facebook").child("totalViews").get().val()
ig_views = db.child("Instagram").child("totalViews").get().val()

fb_x = []
fb_y = []

ig_y = []

for key,value in fb_views.items():
    fb_x.append(key)
    fb_y.append(value)

for key,value in ig_views.items(): 
    ig_y.append(value)

#Obtained fb_data and ig_data as list of x,y pairs

#Schedule code to update
""" 
schedule.every().day.at("04:00").do(update_daily_views)
while True:
    schedule.run_pending()
    time.sleep(1) """

#update_daily_views()


            