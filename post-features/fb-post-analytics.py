import facebook
import requests
import os
import time


#create method to update access token!!
class fb_post:
    def __init__(self, post_title, post_description, media_type):
        #connecting to facebook api
        try:
            self.access = 'EAAoK4UW8A2cBAIKGpblZCvZAdb7bM5Q6ZCSuPtolD5CYOf0z5cTijvaNhtVQ5VGM82DXk9EWpf0gk7IUWkAbFvezW4j7NmmWODTHseXG1mGEQtAhZCGiqBEop52KYJLsIMSRghPI8zzD4EaEy3kCOZArnh7ocXWB4Izh3LDh3WTwCSOdHWjw8ORuGwlCrA6sZD'
            self.graph_api_fb = facebook.GraphAPI(access_token= self.access, version= 3.1)
            print(self.graph_api_fb)
        except Exception as e:
            print(e)
        self.post_title = post_title
        self.post_description = post_description
        self.media_info = None
        self.post_id = None
        self.media_type = media_type
    
    def post_no_media(self):
        #if posting without any media attached
        post_facebook = self.graph_api_fb.put_object(parent_object= 'me', connection_name= 'feed', message= self.post_description)
        self.post_id = post_facebook['id']
        return post_facebook
    
    def post_media_photo(self, media_list): #if the file type is photos
        #posting with media attached

        #inputting media list
        if(len(media_list) >= 1):
            self.media_info = []
            for x in media_list:
                self.media_info.append(x)
        
        #allows for one to post multiple photos
        imgs_id = []
        for img in self.media_info:
            photo = open(img, "rb")
            imgs_id.append(self.graph_api_fb.put_photo(photo, album_id='me/photos',published=False)['id'])
            photo.close()

        args=dict()
        args["message"]= self.post_description
        for img_id in imgs_id:
            key="attached_media["+str(imgs_id.index(img_id))+"]"
            args[key]= "{'media_fbid': '"+img_id+"'}"

        post_facebook = self.graph_api_fb.request(path='/me/feed', args=None, post_args=args, method='POST')
        self.post_id = post_facebook['id']
        return self.post_id
    
    def post_media_video(self, media_list): #limit to only 1 video and videos need to use URL format for faster uploading!!!
        if(len(media_list) >= 1):
            self.media_info = []
            for x in media_list:
                self.media_info.append(x)
        args=dict()
        args["message"]= self.post_description
        self.graph_api_fb.request(path= '/102077748764166/videos?file_url=' + self.media_info[0] + '&description=' + self.post_description, args=None, post_args=args, method='POST')
        time.sleep(90)
        post_facebook = self.graph_api_fb.request(path= '/me?fields=posts{id}', args=None, post_args=None, method='GET')
        self.post_id = post_facebook['posts']['data'][0]['id']
        return self.post_id
        
    def get_fb_post_impressions(self): 
        # will retrieve post engagement statistics
        data_fb = self.graph_api_fb.request(path= str(self.post_id) + '/insights/post_impressions?fields=values', args=None, post_args=None, method='GET')
        list1 =data_fb['data']
        list2 = list1[0]['values']
        return list2['value']

    def get_fb_post_engage_users(self):
        data_fb = self.graph_api_fb.request(path= str(self.post_id) + '/insights/post_engaged_users?fields=values', args=None, post_args=None, method='GET')
        list1 =data_fb['data']
        list2 = list1[0]['values']
        return list2['value']
    
    def get_fb_post_reactions_by_type_total(self):
        reactions = dict()
        reactions['num_likes'] = self.graph_api_fb.request(path= str(self.post_id) + '/insights/post_reactions_like_total?fields=values', args=None, post_args=None, method='GET')['data'][0]['values']['value']
        reactions['num_love'] = self.graph_api_fb.request(path= str(self.post_id) + '/insights/post_reactions_love_total?fields=values', args=None, post_args=None, method='GET')['data'][0]['values']['value']
        reactions['num_wow'] = self.graph_api_fb.request(path= str(self.post_id) + '/insights/post_reactions_wow_total?fields=values', args=None, post_args=None, method='GET')['data'][0]['values']['value']
        reactions['num_haha'] = self.graph_api_fb.request(path= str(self.post_id) + '/insights/post_reactions_haha_total?fields=values', args=None, post_args=None, method='GET')['data'][0]['values']['value']
        reactions['num_sorry'] = self.graph_api_fb.request(path= str(self.post_id) + '/insights/post_reactions_sorry_total?fields=values', args=None, post_args=None, method='GET')['data'][0]['values']['value']
        reactions['num_anger'] = self.graph_api_fb.request(path= str(self.post_id) + '/insights/post_reactions_anger_total?fields=values', args=None, post_args=None, method='GET')['data'][0]['values']['value']
        return reactions
    
    def get_fb_post_reactions_like_total(self):
        num_likes = self.graph_api_fb.request(path= str(self.post_id) + '/insights/post_reactions_like_total?fields=values', args=None, post_args=None, method='GET')['data'][0]['values']['value']
        return num_likes
    
    def get_fb_post_video_avg_time_watched(self):
        if(self.media_type == 'VIDEO'):
            num_vid_views = self.graph_api_fb.request(path= str(self.post_id) + '/insights/post_video_avg_time_watched?fields=values', args=None, post_args=None, method='GET')['data'][0]['values']['value']
            return num_vid_views
        else:
            return None


#page overall statistics
def get_fb_page_post_engagements():
    access = 'EAAoK4UW8A2cBAIKGpblZCvZAdb7bM5Q6ZCSuPtolD5CYOf0z5cTijvaNhtVQ5VGM82DXk9EWpf0gk7IUWkAbFvezW4j7NmmWODTHseXG1mGEQtAhZCGiqBEop52KYJLsIMSRghPI8zzD4EaEy3kCOZArnh7ocXWB4Izh3LDh3WTwCSOdHWjw8ORuGwlCrA6sZD'
    graph_api_fb = facebook.GraphAPI(access_token= access, version= 3.1)
    page_engagement = graph_api_fb.request(path= '/102077748764166/insights/page_post_engagements/week?fields=values', args=None, post_args=None, method='GET')['data'][0]['values'][1]['value']
    return page_engagement

def get_fb_page_impressions_by_age_gender_unique(): #need to check metric : provides no information
    access = 'EAAoK4UW8A2cBAIKGpblZCvZAdb7bM5Q6ZCSuPtolD5CYOf0z5cTijvaNhtVQ5VGM82DXk9EWpf0gk7IUWkAbFvezW4j7NmmWODTHseXG1mGEQtAhZCGiqBEop52KYJLsIMSRghPI8zzD4EaEy3kCOZArnh7ocXWB4Izh3LDh3WTwCSOdHWjw8ORuGwlCrA6sZD'
    graph_api_fb = facebook.GraphAPI(access_token= access, version= 3.1)
    page_engagement = graph_api_fb.request(path= '/102077748764166/insights/page_impressions_by_age_gender_unique/week?fields=values', args=None, post_args=None, method='GET')['data']
    if(len(page_engagement) == 0):
        return 0
    else:
        return page_engagement

def get_fb_page_views_external_referral(): #not sure if it is a good metric
    pass

def get_fb_page_views_total():
   access = 'EAAoK4UW8A2cBAIKGpblZCvZAdb7bM5Q6ZCSuPtolD5CYOf0z5cTijvaNhtVQ5VGM82DXk9EWpf0gk7IUWkAbFvezW4j7NmmWODTHseXG1mGEQtAhZCGiqBEop52KYJLsIMSRghPI8zzD4EaEy3kCOZArnh7ocXWB4Izh3LDh3WTwCSOdHWjw8ORuGwlCrA6sZD'
   graph_api_fb = facebook.GraphAPI(access_token= access, version= 3.1)
   page_engagement = graph_api_fb.request(path= '/102077748764166/insights/page_views_total/week?fields=values', args=None, post_args=None, method='GET')['data'][0]['values'][1]['value']
   return page_engagement

def get_fb_page_fans_online_per_day(): #need to check metric : provides no information
    access = 'EAAoK4UW8A2cBAIKGpblZCvZAdb7bM5Q6ZCSuPtolD5CYOf0z5cTijvaNhtVQ5VGM82DXk9EWpf0gk7IUWkAbFvezW4j7NmmWODTHseXG1mGEQtAhZCGiqBEop52KYJLsIMSRghPI8zzD4EaEy3kCOZArnh7ocXWB4Izh3LDh3WTwCSOdHWjw8ORuGwlCrA6sZD'
    graph_api_fb = facebook.GraphAPI(access_token= access, version= 3.1)
    page_engagement = graph_api_fb.request(path= '/102077748764166/insights/page_fans_online_per_day/week?fields=values', args=None, post_args=None, method='GET')['data']
    if(len(page_engagement) == 0):
        return 0
    else:
        return page_engagement



# for testing purposes ONLY
def main():
    #post_title = 'test1'
    #post_description = 'test number 3'
    #post1 = fb_post(post_title,post_description, 'VIDEO')
    #user_input = int(input('Want to post with media or without media (0: without media, 1: with media) '))
    '''
    if(user_input == 0):
        post1.post_no_media()
    else:
        media = ['pexels-linda-ellershein-1749900.jpeg', 'highway-wallpapers-15.jpeg']
        media_2 = ['https://justinstolpe.com/sandbox/ig_publish_content_vid.mp4']
        print(post1.post_media_video(media_2))
        print(post1.get_fb_post_impressions())
    '''
    print(get_fb_page_views_total())


if __name__ == '__main__':
    main()
