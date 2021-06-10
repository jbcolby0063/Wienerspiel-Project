import tweepy
import requests
import json
from requests_oauthlib import OAuth1Session

class twitter_post:
    def __init__(self, post_description, post_title):
        try:
            auth = tweepy.OAuthHandler('Dms71H6xrSebuT8YOvwWQnQ4G', 'CSSifyiVm6480KrAwcU7CBJZoD38En3tc8aND26Hle3Wy0q9U9')
            auth.set_access_token('1392227559815979009-m5jZ3bVfPPhPAFks2dJ4WehvneDmPm', 'fpkKpHxK2Z0CGu8HIZMoNPduzn5FglA2g03M51e5KzuTQ')
            self.api = tweepy.API(auth)
            print('connection established', self.api)
        except Exception as e:
            print(e)
        self.post_description = post_description
        self.post_media = None #list of all the file paths
        self.post_title = post_title
        self.media_id = None #list of all the media ids
        self.post_status_id = None
  
    def media_file_list(self, media_list):
        if(len(media_list) >= 1):
            self.post_media = []
            for x in media_list:
                self.post_media.append(x)
        return self.post_media
    
    def tweet_post_media(self):
        #allows user to send multiple media files
        if(len(self.post_media) >= 1):
            self.media_id = []
            for x in self.post_media:
                media_obj = self.api.media_upload(x)
                print(media_obj.media_id)
                self.media_id.append(media_obj.media_id_string)
        status_tweet = self.api.update_status(self.post_description, media_ids = self.media_id)
        self.post_status_id = status_tweet.id
        return status_tweet

    def tweet_post_nomedia(self):
        status_tweet = self.api.update_status(self.post_description)
        self.post_status_id = status_tweet.id
        return status_tweet
    
    #twitter platform analytics : need to check code to see what is wrong!!!

    def retweet_counter(self):
        # how many times a tweet has been retweeted
        tweet_status = self.api.get_status(self.post_status_id)
        return tweet_status.retweet_count
    
    def impression_counter(self): #NEED TO LOOK OVER!!!
        #url = 'https://api.twitter.com/labs/1/tweets/metrics/private?' + 'ids=' + str(tweet_id)
        url = 'https://api.twitter.com/2/tweets/' + str(self.post_status_id) + "?tweet.fields=non_public_metrics"
        print(url)
        btoken = 'AAAAAAAAAAAAAAAAAAAAAPr7PgEAAAAAsxCzM1iwtPOHjDCLMxEq2ma0qqE%3D1Eal97m1QHOesSR0VzruaCL4gI0rfKqHZc5CZCL6r9YS889v2C'
        headers = {"Authorization": "Bearer {}".format(btoken)}
        
        data = requests.request('GET',url)
        #json_data = json.loads(data)
        return data.json()
    
    def reply_counter(self):
        user = 'tamudsc'
        
        t = self.api.search(q=f'to:{user}', since_id=self.post_status_id)

        replies = 0
        for i in range(len(t)):
            if t[i].in_reply_to_status_id == self.post_status_id:
                replies += 1
        
        return replies
    
    def like_counter(self):
        tweet_status = self.api.get_status(self.post_status_id)
        return tweet_status.favorite_count
    
    def video_views_counter(self): #NEED TO LOOK OVER AGAIN!
        url = 'https://api.twitter.com/2/tweets/' + str(self.post_status_id) + "?expansions=attachments.media_keys&media.fields=public_metrics"
        btoken = 'AAAAAAAAAAAAAAAAAAAAAPr7PgEAAAAAsxCzM1iwtPOHjDCLMxEq2ma0qqE%3D1Eal97m1QHOesSR0VzruaCL4gI0rfKqHZc5CZCL6r9YS889v2C'
        headers = {"Authorization": "Bearer {}".format(btoken)}
        data = requests.request('GET',url, headers=headers)
        return data.json()

        

def main():
    '''
    - plan to test the code out tomorrow and see what issues there may be
    - make sure that media works properly FIRST
    - check that one can send tweets without posting
    '''

    post_description = 'hello world!'
    #media_for_post = ['pexels-linda-ellershein-1749900.jpeg', 'highway-wallpapers-15.jpeg']
    media_2 = ['2_Second_Video.mp4']
    post_title = 'Test1'
    tweet1 = twitter_post(post_description, post_title)
    tweet1.media_file_list(media_2)
    print(tweet1.post_media)
    tweet1.tweet_post_media()
    #print('test:',tweet1.video_views_counter())
    print('id:',tweet1.post_status_id)
    print(tweet1.like_counter())
    #print('impression_counter:', tweet1.impression_counter(tweet1.post_status_id))


if __name__ == "__main__":
    main()
