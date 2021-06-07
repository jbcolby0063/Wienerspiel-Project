import requests
import json
import time
import facebook


#only allows for one image post or 1 video post!
class insta_post:
    def __init__(self, post_title, post_description, media_type):
        self.access = 'EAAoK4UW8A2cBADyh1pKZBIQTDMHu58P3zZC60baQibW2SGCpxxYkegepRJQ1HO21Kb063pAtolYUcdc3EuV3B9jFEEflhaiUv02s9WUrEZAfDS2OFKjTvhOGXGEzZBZCNP7wutZC2K4xbNfvUWZABLfQGcbrwZAiNnZA0KqNpNwtQqWameU5QxbsiKn4fs3Ka7Xrfd0jQbPgds6IZBZClkwZC4Up'
        self.graph_domain = 'https://graph.facebook.com/'
        self.graph_version = 'v10.0'
        self.endpoint_base = self.graph_domain + self.graph_version + '/'
        self.insta_account = "17841448226950067"
        self.response = None
        self.post_title = post_title
        self.post_description = post_description
        self.media_id = None
        self.media_type = media_type
    
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

        return self.api_call(url, endpointParams, 'POST')
    
    def impression_counter(self):
        url = self.endpoint_base + str(self.media_id) + '/insights?metric=impressions&access_token=' + self.access
        graph_api_fb = facebook.GraphAPI(access_token= self.access, version= 3.1)
        metric_info = graph_api_fb.request(path=str(self.media_id) + '/insights?metric=impressions', args=None, post_args=None, method='GET')
        #return self.api_call(url, endpointParams, 'GET') #self.api_call(url, endpointParams, 'GET') # make the api call
        return metric_info

    '''
    def comment_counter(self):
        pass

    def engagement_counter(self):
        pass

    def reach_counter(self):
        pass

    '''
    


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
    data = post1.impression_counter()
    print(data)


if __name__ == '__main__':
    main()
