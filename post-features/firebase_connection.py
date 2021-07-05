from firebase import firebase
import insta_post
import twitter_post_analytics
import fb_post_analytics

def get_post_information(firebase_table_id, sending_user):
    '''
    This function will get the information for the firebase database
    returns the post information in a dictionary format
    '''
    url = 'https://auth-development-3cb88-default-rtdb.firebaseio.com' #this is the url for the firebase database
    firebase_connection = firebase.FirebaseApplication(url, None)
    name_of_db = 'auth-development-3cb88-default-rtdb'
    post_information = firebase_connection.get('/' + name_of_db + '/users/' + sending_user + '/' + firebase_table_id, '')
    return post_information


def publish_to_platform(firebase_table_id, sending_user, media_files, platform_name):
    '''
    will publish information to the appropriate platforms
    will return the post id for each platform in the form of an dictionary object
    will also return the media type in the dictionary object (either 'IMAGE' or 'VIDEO')
    '''
    url = 'https://auth-development-3cb88-default-rtdb.firebaseio.com' #this is the url for the firebase database
    firebase_connection = firebase.FirebaseApplication(url, None)
    post_information = get_post_information(firebase_table_id, sending_user)
    name_of_db = 'auth-development-3cb88-default-rtdb'
    post_title = post_information['title']
    post_description = post_information['text']
    media_type = ' ' #will need to store the media type on firebase!!
    if(platform_name == 'facebook'):
        facebook_post_object = fb_post_analytics.fb_post(post_title, post_description, media_type)
        if(facebook_post_object.media_type == 'VIDEO'):
            video_url = media_files #will get the media file (should not be in list format). Must also be a url not file path
            facebook_post_object.post_media_video(video_url)
            firebase_connection.put('/' + name_of_db + '/users/' + sending_user + '/' + firebase_table_id, 'Facebook_post_id', str(facebook_post_object.post_id))
        elif(facebook_post_object.media_type == 'IMAGE'):
            facebook_post_object.post_media_photo(media_files)
            firebase_connection.put('/' + name_of_db + '/users/' + sending_user + '/' + firebase_table_id, 'Facebook_post_id', str(facebook_post_object.post_id))
        else:
            facebook_post_object.post_no_media()
            firebase_connection.put('/' + name_of_db + '/users/' + sending_user + '/' + firebase_table_id, 'Facebook_post_id', str(facebook_post_object.post_id))
    elif(platform_name == 'Twitter'):
        twitter_post_object = twitter_post_analytics.twitter_post(post_description, post_title, media_type)
        if(twitter_post_object.media_type != None):
            twitter_post_object.media_file_list(media_files) #"media_files" must be in list format!
            twitter_post_object.tweet_post_media()
            firebase_connection.put('/' + name_of_db + '/users/' + sending_user + '/' + firebase_table_id, 'Twitter_post_id', str(twitter_post_object.post_status_id))
        else:
            twitter_post_object.tweet_post_nomedia()
            firebase_connection.put('/' + name_of_db + '/users/' + sending_user + '/' + firebase_table_id, 'Twitter_post_id', str(twitter_post_object.post_status_id))
    else:
        instagram_post_object = insta_post.insta_post(post_title, post_description, media_type)
        instagram_post_object.get_media_ids(media_files) #media files must be file path
        instagram_post_object.publish_post()
        firebase_connection.put('/' + name_of_db + '/users/' + sending_user + '/' + firebase_table_id, 'Instagram_post_id', str(instagram_post_object.post_status_id))


def get_fb_post_analytics(name_of_metric, firebase_table_id, sending_user):
    #will get the post id and then run the specific function based on metric wanted
    post_info = get_post_information(firebase_table_id, sending_user)
    name_of_db = 'auth-development-3cb88-default-rtdb'
    post_title = post_info['title']
    post_description = post_info['text']
    media_type = ' ' #will need to store the media type on firebase!!
    post_id_fb = post_info['Facebook_post_id']
    facebook_post_object = fb_post_analytics.fb_post(post_title, post_description, media_type)
    facebook_post_object.set_fb_post_id(post_id_fb)
    facebook_post_object.set_fb_media_type(media_type)
    if(name_of_metric == 'post impressions'):
        return facebook_post_object.get_fb_post_impressions()
    elif(name_of_metric == 'Post engage users'):
        return facebook_post_object.get_fb_post_engage_users()
    elif(name_of_metric == 'reaction by type'):
        return facebook_post_object.get_fb_post_reactions_by_type_total()
    elif(name_of_metric == 'reaction likes total'):
        return facebook_post_object.get_fb_post_reactions_like_total()
    else:
        return facebook_post_object.get_fb_post_video_avg_time_watched()

def get_twitter_post_analytics(name_of_metric, firebase_table_id, sending_user):
    #will get the post id and then run the specific function based on metric wanted
    post_info = get_post_information(firebase_table_id, sending_user)
    name_of_db = 'auth-development-3cb88-default-rtdb'
    post_title = post_info['title']
    post_description = post_info['text']
    media_type = ' ' #will need to store the media type on firebase!!
    post_id_fb = post_info['Twitter_post_id']
    twitter_post_object = twitter_post_analytics.twitter_post(post_description, post_title, media_type)
    twitter_post_object.set_twitter_post_id(post_id_fb)
    twitter_post_object.set_twitter_media_type(media_type)
    
    if(name_of_metric == 'retweets count'):
        return twitter_post_object.retweet_counter()
    elif(name_of_metric == 'like counter'):
        return twitter_post_object.like_counter()
    elif(name_of_metric == 'impression counter'):
        return twitter_post_object.impression_counter()
    elif(name_of_metric == 'reply counter'):
        return twitter_post_object.reply_counter()
    elif(name_of_metric == 'url link clicks'):
        return twitter_post_object.url_link_clicks_twitter()
    elif(name_of_metric == 'user profile clicks'):
        return twitter_post_object.user_profile_clicks_twitter()
    elif(name_of_metric == 'media quartile counter'):
        return twitter_post_object.media_quartile_counter_twitter()
    elif(name_of_metric == 'video view count'):
        return twitter_post_object.video_view_count_twitter()
    else:
        return twitter_post_object.tweet_hashtags()

def get_insta_post_analytics(name_of_metric, firebase_table_id, sending_user):
    #will get the post id and then run the specific function based on metric wanted
    post_info = get_post_information(firebase_table_id, sending_user)
    name_of_db = 'auth-development-3cb88-default-rtdb'
    post_title = post_info['title']
    post_description = post_info['text']
    media_type = ' ' #will need to store the media type on firebase!!
    post_id_fb = post_info['Instagram_post_id']
    instagram_post_object = insta_post.insta_post(post_title, post_description, media_type)
    instagram_post_object.set_insta_post_id(post_id_fb)
    instagram_post_object.set_insta_media_type(media_type)

    if(name_of_metric == 'impression count'):
        return instagram_post_object.impression_counter()
    elif(name_of_metric == 'comment count'):
        return instagram_post_object.comment_counter()
    elif(name_of_metric == 'like count'):
        return instagram_post_object.like_counter()
    else:
        return instagram_post_object.reach_counter()
