from flask import Flask, render_template
import firebase
import fb_post_analytics
import insta_post

from datetime import datetime
from firebase import firebase
import schedule

firebasePost = firebase.FirebaseApplication("https://wienerspiel-5cbfd-default-rtdb.firebaseio.com", None)
ig_data = {
    datetime.today().strftime("%d-%m-%y"): insta_post.get_insta_account_reach_count(),
}
fb_data = {
    datetime.today().strftime("%d-%m-%y"): fb_post_analytics.get_fb_daily_page_views_total()
}

def update_daily_views():
    firebasePost.post('wienerspiel-5cbfd-default-rtdb/Facebook/totalViews', fb_data)
    firebasePost.post('wienerspiel-5cbfd-default-rtdb/Instagram/totalViews', ig_data)

firebaseGet = firebase.FirebaseApplication("https://wienerspiel-5cbfd-default-rtdb.firebaseio.com", None)
fb_get = firebaseGet.get('/wienerspiel-5cbfd-default-rtdb/Facebook/totalViews', '')
ig_get = firebaseGet.get('/wienerspiel-5cbfd-default-rtdb/Instagram/totalViews', '')

fb_x = []
fb_y = []
ig_y = []

for value in fb_get.values():
    for key,val in value.items():
        fb_x.append(key)
        fb_y.append(val)

for value in ig_get.values():
    for val in value.values():
        ig_y.append(val)


# No longer used
""" firebase = pyrebase.initialize_app(firebaseConfig)
db = firebase.database()

def update_daily_views():
    #Updates total Views for Instagram and Facebook Daily
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
 """
#Obtained fb_data and ig_data as list of x,y pairs

#Schedule code to update
""" 
schedule.every().day.at("04:00").do(update_daily_views)
while True:
    schedule.run_pending()
    time.sleep(1) """

#update_daily_views()


            