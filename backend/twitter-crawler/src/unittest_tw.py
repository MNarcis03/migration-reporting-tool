import unittest

from tw import authentification, parse_tweets, query_30_day, location_to_coord, parsedTweets, stats, load_dotenv


class TestMethods(unittest.TestCase):
    def test_authentification(self):
        load_dotenv(".env")
        self.assertIsNotNone(authentification())

    def test_query(self):
        load_dotenv(".env")
        client = authentification()
        query_30_day(client)
        self.assertGreater(len(parsedTweets), 0)
        t = parsedTweets[0]
        self.assertIn(t["type"], ['#bird', '#mig-here', '#ducks',
                                  '#flamingos', '#grebes', '#doves',
                                  '#cuckoos',
                                  '#flycatchers', '#thrushes', '#pelicans',
                                  '#storks', '#swifts', '#swallows',
                                  '#finches', '#waterbirds', '#thrushes',
                                  '#warblers', '#orioles', '#buntings', '#swallow'])

    def test_location_to_coord(self):
        city = "Hessen, Germany"
        lat, long = location_to_coord(city)
        self.assertEqual(lat, "50.6080651")
        self.assertEqual(long, "9.0284647")

    def test_location_to_coord_2(self):
        city = ""
        lat, long = location_to_coord(city)
        self.assertEqual(lat, "")
        self.assertEqual(long, "")

if __name__ == '__main__':
    unittest.main()
