import tweepy
import requests
import json
from requests_oauthlib import OAuth1
from PIL import Image
import requests
import io
import time

class twitter_post:
    def __init__(self, post_description, post_title, media_type):
        try:
            auth = tweepy.OAuthHandler('OAgAOPP8COMX8il0gjUzRMHia', 'kBy2A5PeNo58GwTrzm0l9L3WQnE6IGEB86hdqxwq7oZwlHfBXb', callback='http://12.0.0.1')
            auth.set_access_token('1392227559815979009-bwt0mYypGs5ZRPUNFc4PS19dhj8VvB', 'EkbVMFfrz0ISKF855GUUShI3GmyqqzuDcdyw27dvopP6K')
            self.api = tweepy.API(auth)
        except Exception as e:
            print(e)
        self.post_description = post_description
        self.post_media = None #list of all the file paths
        self.post_title = post_title
        self.media_id = None #list of all the media ids
        self.post_status_id = None
        self.media_type = media_type
  
    def media_file_list(self, media_list):
        if(len(media_list) >= 1):
            self.post_media = []
            for x in media_list:
                self.post_media.append(x)
        return self.post_media
    
    def tweet_post_media(self):
        #allows user to send multiple media files
        self.media_id = []
        for x in self.post_media:
            if(self.media_type == 'image'):
                print(x)
                file_name = x.split('/')[-1]
                res = requests.get(x)
                media = io.BytesIO(res.content)
                ftype = io.BufferedReader(media)
                response = self.api.media_upload(file_name, file=ftype)
                self.media_id.append(response.media_id_string)
            else: 
                file_name = x.split('/')[-1]
                media_category = 'TweetVideo'
                res = requests.get(x)
                media = io.BytesIO(res.content)
                ftype = io.BufferedReader(media)
                response = self.api.media_upload(file_name, file=ftype, chunked=True, media_category= media_category)
                self.media_id.append(response.media_id_string)
        
        status_tweet = self.api.update_status(self.post_description, media_ids = self.media_id)
        self.post_status_id = status_tweet.id
        return status_tweet

    def tweet_post_nomedia(self):
        status_tweet = self.api.update_status(self.post_description)
        self.post_status_id = status_tweet.id
        return status_tweet

    def set_twitter_post_id(self, post_id):
        self.post_status_id = post_id
        return self.post_status_id
    
    def set_twitter_media_type(self, type_media):
        self.media_type =  type_media
        return self.media_type
    
    
    #twitter platform analytics

    def retweet_counter(self):
        # how many times a tweet has been retweeted
        tweet_status = self.api.get_status(self.post_status_id)
        return tweet_status.retweet_count
    
    def like_counter(self):
        tweet_status = self.api.get_status(self.post_status_id)
        return tweet_status.favorite_count

    def impression_counter(self): 
        headeroauth = OAuth1('OAgAOPP8COMX8il0gjUzRMHia', 'kBy2A5PeNo58GwTrzm0l9L3WQnE6IGEB86hdqxwq7oZwlHfBXb','1392227559815979009-bwt0mYypGs5ZRPUNFc4PS19dhj8VvB', 'EkbVMFfrz0ISKF855GUUShI3GmyqqzuDcdyw27dvopP6K', signature_type='auth_header')
        print(headeroauth)
        url = 'https://api.twitter.com/2/tweets/' + str(self.post_status_id) + '?tweet.fields=organic_metrics'
        data_dict = requests.request('GET', url, auth=headeroauth)
        return data_dict.json()['data']['organic_metrics']['impression_count']
    
    def reply_counter(self):
        headeroauth = OAuth1('OAgAOPP8COMX8il0gjUzRMHia', 'kBy2A5PeNo58GwTrzm0l9L3WQnE6IGEB86hdqxwq7oZwlHfBXb','1392227559815979009-bwt0mYypGs5ZRPUNFc4PS19dhj8VvB', 'EkbVMFfrz0ISKF855GUUShI3GmyqqzuDcdyw27dvopP6K', signature_type='auth_header')
        print(headeroauth)
        url = 'https://api.twitter.com/2/tweets/' + str(self.post_status_id) + '?tweet.fields=organic_metrics'
        data_dict = requests.request('GET', url, auth=headeroauth)
        return data_dict.json()['data']['organic_metrics']['reply_count']
    
    def url_link_clicks_twitter(self):
        headeroauth = OAuth1('OAgAOPP8COMX8il0gjUzRMHia', 'kBy2A5PeNo58GwTrzm0l9L3WQnE6IGEB86hdqxwq7oZwlHfBXb','1392227559815979009-bwt0mYypGs5ZRPUNFc4PS19dhj8VvB', 'EkbVMFfrz0ISKF855GUUShI3GmyqqzuDcdyw27dvopP6K', signature_type='auth_header')
        print(headeroauth)
        url = 'https://api.twitter.com/2/tweets/' + str(self.post_status_id) + '?tweet.fields=organic_metrics'
        data_dict = requests.request('GET', url, auth=headeroauth)
        if('url_link_clicks' in data_dict.json()['data']['organic_metrics']):
            return data_dict.json()['data']['organic_metrics']['url_link_clicks']
        else:
            return None
    
    def user_profile_clicks_twitter(self):
        headeroauth = OAuth1('OAgAOPP8COMX8il0gjUzRMHia', 'kBy2A5PeNo58GwTrzm0l9L3WQnE6IGEB86hdqxwq7oZwlHfBXb','1392227559815979009-bwt0mYypGs5ZRPUNFc4PS19dhj8VvB', 'EkbVMFfrz0ISKF855GUUShI3GmyqqzuDcdyw27dvopP6K', signature_type='auth_header')
        print(headeroauth)
        url = 'https://api.twitter.com/2/tweets/' + str(self.post_status_id) + '?tweet.fields=organic_metrics'
        data_dict = requests.request('GET', url, auth=headeroauth)
        return data_dict.json()['data']['organic_metrics']['user_profile_clicks']
    
    def media_quartile_counter_twitter(self):
        if(self.media_type == 'VIDEO'):
            url = 'https://api.twitter.com/2/tweets/' + str(self.post_status_id) + '?tweet.fields=non_public_metrics,organic_metrics&media.fields=non_public_metrics,organic_metrics&expansions=attachments.media_keys'
            headeroauth = OAuth1('OAgAOPP8COMX8il0gjUzRMHia', 'kBy2A5PeNo58GwTrzm0l9L3WQnE6IGEB86hdqxwq7oZwlHfBXb','1392227559815979009-bwt0mYypGs5ZRPUNFc4PS19dhj8VvB', 'EkbVMFfrz0ISKF855GUUShI3GmyqqzuDcdyw27dvopP6K', signature_type='auth_header')
            data_dict = requests.request('GET', url, auth=headeroauth)
            
            quartile_count = dict()
            quartile_count["playback_0_count"] = data_dict.json()['includes']['media'][0]['non_public_metrics']["playback_0_count"]
            quartile_count["playback_25_count"] = data_dict.json()['includes']['media'][0]['non_public_metrics']["playback_25_count"]
            quartile_count["playback_50_count"] = data_dict.json()['includes']['media'][0]['non_public_metrics']["playback_50_count"]
            quartile_count["playback_75_count"] = data_dict.json()['includes']['media'][0]['non_public_metrics']["playback_75_count"]
            quartile_count["playback_100_count"] = data_dict.json()['includes']['media'][0]['non_public_metrics']["playback_100_count"]
            return quartile_count
        else:
            return None

    def video_view_count_twitter(self):
        if(self.media_type == 'VIDEO'):
            url = 'https://api.twitter.com/2/tweets/' + str(self.post_status_id) + '?tweet.fields=non_public_metrics,organic_metrics&media.fields=non_public_metrics,organic_metrics&expansions=attachments.media_keys'
            headeroauth = OAuth1('OAgAOPP8COMX8il0gjUzRMHia', 'kBy2A5PeNo58GwTrzm0l9L3WQnE6IGEB86hdqxwq7oZwlHfBXb','1392227559815979009-bwt0mYypGs5ZRPUNFc4PS19dhj8VvB', 'EkbVMFfrz0ISKF855GUUShI3GmyqqzuDcdyw27dvopP6K', signature_type='auth_header')
            data_dict = requests.request('GET', url, auth=headeroauth)
            return data_dict.json()['includes']['media'][0]['organic_metrics']['view_count']
        return None

    def tweet_hashtags(self):
        entitiles_dict = self.api.get_status(self.post_status_id).entities
        return entitiles_dict['hashtags'] #returns a list of dictionaries with the hashtags!!

