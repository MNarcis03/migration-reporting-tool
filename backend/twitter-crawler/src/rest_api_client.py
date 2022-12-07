import requests
from dotenv import dotenv_values
from singleton_meta import SingletonMeta
from tweet_model import TweetModel


class RestApiClient(metaclass = SingletonMeta):
    __ENV_FILE_PATH = ".env"
    __HOST_KEY = "INTERNAL_REST_API_HOST"
    __PORT_KEY = "INTERNAL_REST_API_PORT"
    __POST_ROUTE_KEY = "INTERNAL_REST_API_POST_ROUTE"
    __url = None


    def __init__(self):
        config = dotenv_values(self.__ENV_FILE_PATH)

        if None != config:
            host = config[self.__HOST_KEY]
            port = config[self.__PORT_KEY]
            route = config[self.__POST_ROUTE_KEY]

            if None != host and None != port and None != route:
                self.__url = host + ":" + port + route


    def POST(self, _tweet):
        if isinstance(_tweet, TweetModel):
            data = _tweet.get_data()

            if None != data:
                if None != self.__url:
                    req = requests.post(url=self.__url, json=data)
                    return True
                else: print("Invalid URL!")
            else: print("Invalid JSON!")
        else: print("Invalid PARAMETER!")

        return False
