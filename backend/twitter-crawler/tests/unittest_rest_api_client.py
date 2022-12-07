import sys
import unittest


sys.path.append("../src")
from rest_api_client import RestApiClient
from tweet_model import TweetModel


class TestRestApiClient(unittest.TestCase):
    def test_POST_success(self):
        TWEET_ID = "TWID1"
        CAPTION = "Bird migration here.."
        IMAGE_URL = "https://url/path/to/image"
        LOCATION = "Iasi, Romania"
        TIME_AND_DATE = "2022-12-10 23:59:59"
        BIRD_SPECIES = "Mute Swan"

        tweet = TweetModel(TWEET_ID, CAPTION, IMAGE_URL,
            LOCATION, TIME_AND_DATE, BIRD_SPECIES)

        rest_api_client = RestApiClient()

        return_status = rest_api_client.POST(tweet)
        self.assertTrue(return_status == True)

    def test_POST_failed_invalid_parameter1(self):
        rest_api_client = RestApiClient()

        return_status = rest_api_client.POST(None)
        self.assertTrue(return_status == False)

    def test_POST_failed_invalid_parameter2(self):
        tweet = TweetModel(None, None, None,
            None, None, None)

        rest_api_client = RestApiClient()

        return_status = rest_api_client.POST(tweet)
        self.assertTrue(return_status == False)


if __name__ == '__main__':
    unittest.main()
