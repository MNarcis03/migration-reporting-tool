import schedule
import time

from tw import load_dotenv, authentification, query_30_day, query, dump_to_json, parse_tweets, parsedTweets
from image_classification import image_filter


def job():
    print("I'm working...")
    load_dotenv("D:\\personal\\bird\\.env")
    client = authentification()
    query_30_day(client)
    dump_to_json(parsedTweets, "birds-image2.json")
    image_filter("birds-image.json")


schedule.every().monday.at("08:00").do(job)
while True:
    schedule.run_pending()
    time.sleep(1)
