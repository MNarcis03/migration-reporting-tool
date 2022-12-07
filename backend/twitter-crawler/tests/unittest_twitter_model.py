import sys
import unittest


sys.path.append("../src")
from tweet_model import TweetModel


class TestTweetModel(unittest.TestCase):
    def test_get_data_success(self):
        TWEET_ID = "TWID1"
        CAPTION = "Bird migration here.."
        IMAGE_URL = "https://url/path/to/image"
        LOCATION = "Iasi, Romania"
        TIME_AND_DATE = "2022-12-10 23:59:59"
        BIRD_SPECIES = "Mute Swan"

        tweet = TweetModel(TWEET_ID, CAPTION, IMAGE_URL,
            LOCATION, TIME_AND_DATE, BIRD_SPECIES)

        data = tweet.get_data()

        self.assertTrue(data != None)

    def test_get_data_failed(self):
        tweet = TweetModel(None, None, None,
            None, None, None)

        data = tweet.get_data()

        self.assertTrue(data == None)


if __name__ == '__main__':
    unittest.main()
