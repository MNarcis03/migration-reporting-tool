import os
import tweepy
from dotenv import load_dotenv
import unittest


def authentification():
    load_dotenv("D:\\personal\\bird\\.env")
    consumer_key = os.getenv('API_KEY')
    consumer_secret = os.getenv("API_KEY_SECRET")
    access_key = os.getenv("ACCESS_TOKEN")
    access_secret = os.getenv("ACCESS_TOKEN_SECRET")
    bearer_token = os.getenv("BEARER_TOKEN")

    client = tweepy.Client(bearer_token, consumer_key,
                           consumer_secret,
                           access_key, access_secret,
                           wait_on_rate_limit=True)
    return client


def query():
    client = authentification()
    query = '#bird -is:retweet lang:en'
    tw = client.search_recent_tweets(query=query, user_auth=True)
    return tw.data


class TestMethods(unittest.TestCase):
    def test_authentification(self):
        self.assertEqual(authentification().get_me().data["name"], "Madalina")

    def test_query(self):
        self.assertGreater(len(query()), 0, "No results")


if __name__ == '__main__':
    unittest.main()
