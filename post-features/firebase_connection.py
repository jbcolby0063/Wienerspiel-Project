#connecting to firebase
import pyrebase
import insta_post
import twitter_post_analytics
import fb_post_analytics

def get_config():
    #will return the configuration information in order to connect to the firebase database
    config = dict()
    config["apiKey"]= " " 
    config["authDomain"] = " "
    config["databaseURL"] = " "
    config["projectId"] = " "
    config["storageBucket"] = " "
    config["messagingSenderId"] = " "

    return config


def get_post_information():
    #this will get the post information from the firebase database
    pass


def publish_to_platform():
    #will publish information to the appropriate platforms
    #will return the post id for each platform in the form of an dictionary object
    #will also return the media type in the dictionary object (either 'IMAGE' or 'VIDEO')
    pass


def get_fb_post_analytics(name_of_metric):
    #will get the post id and then run the specific function based on metric wanted
    pass

def get_twitter_post_analytics(name_of_metric):
    #will get the post id and then run the specific function based on metric wanted
    pass

def get_insta_post_analytics(name_of_metric):
    #will get the post id and then run the specific function based on metric wanted
    pass
