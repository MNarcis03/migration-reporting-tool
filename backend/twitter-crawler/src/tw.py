import tweepy
import json
import os
from dotenv import load_dotenv
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut
from unidecode import unidecode

parsedTweets = []
bird_no = dict()
cities = dict()
bird_species = dict()
times = dict()
special_infolist = []


def dump_to_json(rez, filename):
    json_string = json.dumps(rez, indent=4)
    with open(filename, "w", encoding='utf8') as outfile:
        outfile.write(json_string)


def special_info():
    global bird_no
    global cities
    global bird_species
    global special_infolist
    for k in bird_no.keys():
        special_info_dict = \
            {
                "location": (cities[k]),
                "latitude": k.split("|")[0],
                "longitude": k.split("|")[1],
                "total_number": bird_no[k],
            }
        for t in bird_species[k]:
            special_info_dict[t] = bird_species[k][t]
        special_infolist.append(special_info_dict)


def stats(json_file):
    global bird_no
    global cities
    global bird_species
    global times
    f = open(json_file)
    data = json.load(f)
    for d in data:
        if len(d["user_lat"]) > 0 and len(d["user_long"]) > 0:
            coord = d["user_lat"] + "|" + d["user_long"]
            if coord in bird_no:
                bird_no[coord] += 1
                if d["type"] in bird_species[coord]:
                    bird_species[coord][d["type"]] += 1
                else:
                    bird_species[coord][d["type"]] = 1
            else:
                bird_no[coord] = 1
                cities[coord] = d["user_location"]
                bird_species[coord] = dict()
                if d["type"] in bird_species[coord]:
                    bird_species[coord][d["type"]] += 1
                else:
                    bird_species[coord][d["type"]] = 1
    # for d in data2:
    #     if "user_lat" in d:
    #         if d["user_location"] in bird_no:
    #             bird_no[d["user_location"]] += 1
    #         else:
    #             bird_no[d["user_location"]] = 1
    #
    # for d in data3:
    #     if "user_lat" in d:
    #         if d["user_location"] in bird_no:
    #             bird_no[d["user_location"]] += 1
    #         else:
    #             bird_no[d["user_location"]] = 1
    # dump_to_json(bird_no, "no2.json")
    # all_stats = []
    # stats = dict()
    # for k in bird_no:
    #     stats[k] = bird_no[k]
    #     lat = location_to_coord(k)[0]
    #     long = location_to_coord(k)[1]
    #     stats["latitude"] = lat
    #     stats["longitude"] = long
    #     all_stats.append(stats)
    # dump_to_json(all_stats, "statistici.json")


def findGeocode(city):
    try:
        geolocator = Nominatim(user_agent="geoapiExercises")
        return geolocator.geocode(city)

    except GeocoderTimedOut:
        return findGeocode(city)


def location_to_coord(city):
    loc = findGeocode(city)
    try:
        lat = loc.latitude
        log = loc.longitude
    except:
        lat = ""
        log = ""
    return str(lat), str(log)


def get_user_location_by_id(client, id: str):
    prf = client.get_user(id=id)


def determine_tweet_type(tweet):
    if tweet["in_reply_to_status_id"] is not None:
        tweet_type = "Reply Tweet"
    elif tweet["is_quote_status"] is True and not tweet["text"].startswith("RT"):
        tweet_type = "Quote Tweet"
    elif tweet["text"].startswith("RT") and tweet.get("retweeted_status") is not None:
        tweet_type = "Retweet"
    else:
        tweet_type = "Original Tweet"
    return tweet_type


def authentification():
    CONSUMER_KEY = os.getenv('CONSUMER_KEY')
    CONSUMER_SECRET = os.getenv('CONSUMER_SECRET')
    bearer_token = os.getenv('bearer_token')
    ACCESS_TOKEN = os.getenv('ACCESS_TOKEN_F')
    ACCESS_TOKEN_SECRET = os.getenv('ACCESS_TOKEN_SECRET_F')

    auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
    auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
    api = tweepy.API(auth)

    return api


def parse_tweets(status, bird_type):
    global parsedTweets
    for tweet in status:
        if determine_tweet_type(tweet._json) == 'Original Tweet':
            mydict = {"tweet_id": tweet._json["id_str"],
                      "date": tweet._json["created_at"],
                      "user_id": tweet._json["user"]["id"],
                      "type": bird_type,
                      "geo": tweet._json["geo"],
                      "coordinates": tweet._json["coordinates"],
                      "user_location": (tweet._json["user"]["location"])

                      }
            try:
                lat = location_to_coord(unidecode(tweet._json["user"]["location"]))[0]
                long = location_to_coord(unidecode(tweet._json["user"]["location"]))[1]

                mydict["user_lat"] = lat
                mydict["user_long"] = long
            except:
                mydict["user_lat"] = ""
                mydict["user_long"] = ""

            parsedTweets.append(mydict)


def custome_query_30_day(client, queries):
    for q in queries:
        for page in tweepy.Cursor(client.search_30_day, label='development',
                                  query=q).pages(1):
            parse_tweets(page, q)


def query_30_day(client):
    queries = ['#bird', '#mig-here', '#ducks',
               '#flamingos', '#grebes', '#doves',
               '#cuckoos',
               '#flycatchers', '#thrushes', '#pelicans',
               '#storks', '#swifts', '#swallows',
               '#finches', '#waterbirds', '#thrushes',
               '#warblers', '#orioles', '#buntings', '#swallow']
    for q in queries:
        for page in tweepy.Cursor(client.search_30_day, label='development',
                                  query=q).pages(1):
            parse_tweets(page, q)


def query(client):
    queries = ['#bird', '#mig-here', '#ducks',
               '#flamingos', '#grebes', '#doves',
               '#cuckoos',
               '#flycatchers', '#thrushes', '#pelicans',
               '#storks', '#swifts', '#swallows',
               '#finches', '#waterbirds', '#thrushes',
               '#warblers', '#orioles', '#buntings', '#swallow']
    date_since = "202003030800"
    for q in queries:
        for page in tweepy.Cursor(client.search_full_archive, query=q, label='research', fromDate=date_since).pages(1):
            parse_tweets(page, q)


if __name__ == '__main__':
    # load_dotenv("D:\\personal\\bird\\.env")
    # client = authentification()
    # query(client)
    # dump_to_json(parsedTweets, "birds4.json")
    stats("final_loc.json")
    stats("birds2.json")
    stats("birds3.json")
    # dump_to_json(bird_no, "no2.json")
    special_info()
    dump_to_json(special_infolist, "special_info.json")
