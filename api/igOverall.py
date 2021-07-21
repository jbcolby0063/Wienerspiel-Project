import firebase
from datetime import datetime
from firebase import firebase
import schedule
import insta_post

firebasePost = firebase.FirebaseApplication("https://wienerspiel-5cbfd-default-rtdb.firebaseio.com", None)

reach_data = {
    datetime.today().strftime("%d-%m"): insta_post.get_insta_account_reach_count()
}

follower_data = {
    datetime.today().strftime("%d-%m"): insta_post.get_insta_account_follower_count()
}

def update_react_count(): 
    firebasePost.post('OverallAnalytics/InstagramOverall/reachCount', reach_data)
    firebasePost.post('OverallAnalytics/InstagramOverall/followerCount', follower_data)

#update_react_count() #Call function to post reach data and follower data to Firebase

#Retrieve data from Firebase
firebaseGet = firebase.FirebaseApplication("https://wienerspiel-5cbfd-default-rtdb.firebaseio.com", None)
reach_get = firebaseGet.get('OverallAnalytics/InstagramOverall/reachCount', '')
follower_get = firebaseGet.get('OverallAnalytics/InstagramOverall/followerCount', '')

#Create empty lists to store x-axis and y-values for graphing on Chart.js later
reach_x = []
reach_y = []
follower_x = []
follower_y =[]

for value in reach_get.values():
    for key,val in value.items():
        reach_x.append(key)
        reach_y.append(val)

if (len(reach_x) > 7):
    count_delete = len(reach_x) - 7
    del reach_x[:count_delete]
    del reach_y[:count_delete]

""" for value in follower_get.values():
    for key,val in value.items():
        follower_x.append(key)
        follower_y.append(val) """




