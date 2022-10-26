#import requests

class Singleton(object):
  _instances = {}

  def __new__(class_, *args, **kwargs):
    if class_ not in class_._instances:
      class_._instances[class_] = super(Singleton, class_).__new__(class_, *args, **kwargs)
    return class_._instances[class_]

class InstaCrawler(Crawler, Singleton):
  def __init__(self, _tag):
    self.HASH_KEY_ = "graphql"
    self.HASHTAG_KEY_ = "hashtag"
    self.MEDIA_KEY_ = "edge_hashtag_to_media"
    self.LIST_KEY_ = "edges"
    self.NODE_KEY_ = "node"
    self.CAPTION_LIST_KEY_ = "edge_media_to_caption"
    self.TEXT_KEY_ = "text"
    self.tag_ = _tag

  get_url(self):
    URL = "https://www.instagram.com/explore/tags/" + self.tag_ + "/?__a=1"
    return URL

  fetch_posts(self):
    pass

  crawl(self, cycle):
    pass

insta_crawler = InstaCrawler("mig-here")
