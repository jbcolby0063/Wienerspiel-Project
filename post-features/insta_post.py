import requests
import json
import time
import facebook


#only allows for one image post or 1 video post!
class insta_post:
    def __init__(self, post_title, post_description, media_type):
        self.access = 'EAAoK4UW8A2cBAIKGpblZCvZAdb7bM5Q6ZCSuPtolD5CYOf0z5cTijvaNhtVQ5VGM82DXk9EWpf0gk7IUWkAbFvezW4j7NmmWODTHseXG1mGEQtAhZCGiqBEop52KYJLsIMSRghPI8zzD4EaEy3kCOZArnh7ocXWB4Izh3LDh3WTwCSOdHWjw8ORuGwlCrA6sZD'
        self.graph_domain = 'https://graph.facebook.com/'
        self.graph_version = 'v10.0'
        self.endpoint_base = self.graph_domain + self.graph_version + '/'
        self.insta_account = "17841448226950067"
        self.response = None
        self.post_title = post_title
        self.post_description = post_description
        self.media_id = None
        self.media_type = media_type
        self.post_id = None
    
    def api_call(self, url, endpointParams, type):
        #conditional that posts the endpoints to the url specified
        if type == 'POST' : # post request
            data = requests.post( url,endpointParams)
        else : # get request
            data = requests.get( url, endpointParams )

        #stores the response information
        self.response = dict() # hold response info
        self.response['url'] = url # url we are hitting
        self.response['endpoint_params'] = endpointParams #parameters for the endpoint
        self.response['endpoint_params_pretty'] = json.dumps(endpointParams, indent= 4) # pretty print for cli
        self.response['json_data'] = json.loads(data.content) # response data from the api
        self.response['json_data_pretty'] = json.dumps(self.response['json_data'], indent= 4) # pretty print for cli

        return self.response # get and return content

    def get_media_ids(self, media_urls):
        url = self.endpoint_base + self.insta_account + '/media'
        
        endpointParams = dict()
        endpointParams['caption'] = self.post_description
        endpointParams['access_token'] = self.access

        if(self.media_type == 'IMAGE'):
            endpointParams['image_url'] = media_urls
        else:
            endpointParams['video_url'] = media_urls
            endpointParams['media_type'] = self.media_type

        self.media_id = self.api_call(url, endpointParams, 'POST')['json_data']['id']
        return self.media_id
    
    def publish_post(self):
        url = self.endpoint_base + self.insta_account + '/media_publish'

        endpointParams = dict()
        endpointParams['creation_id'] = self.media_id
        endpointParams['access_token'] = self.access
        self.api_call(url, endpointParams, 'POST')
        time.sleep(30)
        get_url = self.endpoint_base + self.insta_account + '/media?access_token=' + self.access
        ids = requests.request('GET', get_url).json()
        self.post_id = ids['data'][0]['id']
        return self.post_id

    def set_insta_post_id(self, post_id):
        self.post_id = post_id
        return self.post_id
    
    def set_insta_media_type(self, media_type):
        self.media_type = media_type
        return self.media_type
    

    #analytics
    def impression_counter(self):
        url = 'https://graph.facebook.com/' + str(self.post_id) + '/insights?metric=impressions&access_token=' + self.access
        data = requests.request('GET', url).json()['data'][0]['values'][0]['value']
        return data
    
    
    def comment_counter(self):
        url = 'https://graph.facebook.com/v10.0/' + str(self.post_id) + '?fields=comments_count&access_token=' + self.access
        data = requests.request('GET', url).json()
        return data['comments_count']

    def like_counter(self):
        url = 'https://graph.facebook.com/v10.0/' + str(self.post_id) + '?fields=like_count&access_token=' + self.access
        data = requests.request('GET', url).json()
        return data['like_count']

    def reach_counter(self):
        url = 'https://graph.facebook.com/' + str(self.post_id) + '/insights?metric=reach&access_token=' + self.access
        data = requests.request('GET', url).json()['data'][0]['values'][0]['value']
        return data
    


#user account analytics
def get_insta_account_reach_count():
    access = 'EAAoK4UW8A2cBAIKGpblZCvZAdb7bM5Q6ZCSuPtolD5CYOf0z5cTijvaNhtVQ5VGM82DXk9EWpf0gk7IUWkAbFvezW4j7NmmWODTHseXG1mGEQtAhZCGiqBEop52KYJLsIMSRghPI8zzD4EaEy3kCOZArnh7ocXWB4Izh3LDh3WTwCSOdHWjw8ORuGwlCrA6sZD'
    url = 'https://graph.facebook.com/v10.0/17841448226950067/insights?metric=reach&period=week&fields=values&access_token=' + access
    info = requests.request('GET', url).json()
    return info['data'][0]['values'][0]['value']

def get_insta_account_follower_count(): #need a minimum of 100 followers in order to get data
    access = 'EAAoK4UW8A2cBAIKGpblZCvZAdb7bM5Q6ZCSuPtolD5CYOf0z5cTijvaNhtVQ5VGM82DXk9EWpf0gk7IUWkAbFvezW4j7NmmWODTHseXG1mGEQtAhZCGiqBEop52KYJLsIMSRghPI8zzD4EaEy3kCOZArnh7ocXWB4Izh3LDh3WTwCSOdHWjw8ORuGwlCrA6sZD'
    url = 'https://graph.facebook.com/v10.0/17841448226950067/insights?metric=follower_count&period=day&fields=values&access_token=' + access
    info = requests.request('GET', url).json()
    if(len(info['data']) == 0):
        return 0
    else:
        return info['data'][0]['values'][0]['value']

def get_insta_account_audience_country(): #need a minimum of 100 followers in order to get data
    access = 'EAAoK4UW8A2cBAIKGpblZCvZAdb7bM5Q6ZCSuPtolD5CYOf0z5cTijvaNhtVQ5VGM82DXk9EWpf0gk7IUWkAbFvezW4j7NmmWODTHseXG1mGEQtAhZCGiqBEop52KYJLsIMSRghPI8zzD4EaEy3kCOZArnh7ocXWB4Izh3LDh3WTwCSOdHWjw8ORuGwlCrA6sZD'
    url = 'https://graph.facebook.com/v10.0/17841448226950067/insights?metric=audience_country&period=lifetime&fields=values&access_token=' + access
    info = requests.request('GET', url).json()
    if(len(info['data']) == 0):
        return 0
    else:
        return info['data']

def get_insta_account_profile_views():
    access = 'EAAoK4UW8A2cBAIKGpblZCvZAdb7bM5Q6ZCSuPtolD5CYOf0z5cTijvaNhtVQ5VGM82DXk9EWpf0gk7IUWkAbFvezW4j7NmmWODTHseXG1mGEQtAhZCGiqBEop52KYJLsIMSRghPI8zzD4EaEy3kCOZArnh7ocXWB4Izh3LDh3WTwCSOdHWjw8ORuGwlCrA6sZD'
    url = 'https://graph.facebook.com/v10.0/17841448226950067/insights?metric=profile_views&period=day&fields=values&access_token=' + access
    info = requests.request('GET', url).json()
    return info['data'][0]['values'][0]['value']


def get_insta_account_online_followers(): #need a minimum of 100 followers in order to get data
    access = 'EAAoK4UW8A2cBAIKGpblZCvZAdb7bM5Q6ZCSuPtolD5CYOf0z5cTijvaNhtVQ5VGM82DXk9EWpf0gk7IUWkAbFvezW4j7NmmWODTHseXG1mGEQtAhZCGiqBEop52KYJLsIMSRghPI8zzD4EaEy3kCOZArnh7ocXWB4Izh3LDh3WTwCSOdHWjw8ORuGwlCrA6sZD'
    url = 'https://graph.facebook.com/v10.0/17841448226950067/insights?metric=online_followers&period=lifetime&fields=values&access_token=' + access
    info = requests.request('GET', url).json()
    if(len(info['data']) == 0):
        return 0
    else:
        return info['data']

def get_insta_account_audience_gender_age():
    access = 'EAAoK4UW8A2cBAIKGpblZCvZAdb7bM5Q6ZCSuPtolD5CYOf0z5cTijvaNhtVQ5VGM82DXk9EWpf0gk7IUWkAbFvezW4j7NmmWODTHseXG1mGEQtAhZCGiqBEop52KYJLsIMSRghPI8zzD4EaEy3kCOZArnh7ocXWB4Izh3LDh3WTwCSOdHWjw8ORuGwlCrA6sZD'
    url = 'https://graph.facebook.com/v10.0/17841448226950067/insights?metric=audience_gender_age&period=lifetime&fields=values&access_token=' + access
    info = requests.request('GET', url).json()
    if(len(info['data']) == 0):
        return 0
    else:
        return info['data']



def main():
    post1 = insta_post('title1', 'this is a post done using python', 'IMAGE')
    media_url1 = 'http://thewowstyle.com/wp-content/uploads/2015/01/nature-images.jpg'
    #media_url2 = 'http://wonderfulengineering.com/wp-content/uploads/2014/01/highway-wallpapers-15.jpg'
    #video_url = 'https://justinstolpe.com/sandbox/ig_publish_content_vid.mp4'

    print(post1.get_media_ids(media_url1))
    #time.sleep(20) # wait 5 seconds if the media object is still being processed
    #print(post1.get_media_ids(media_url2))
    print(post1.publish_post())
    print('post published')
    data = post1.like_counter()
    print(data)

    print('User account analytics')
    print(get_insta_account_reach_count())


if __name__ == '__main__':
    main()
