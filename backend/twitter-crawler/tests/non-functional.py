from tw import authentification, dump_to_json, query_30_day, custome_query_30_day, location_to_coord, parsedTweets, \
    load_dotenv
import timeit
from timeit import default_timer as timer


# performance testing
def test_query_time():
    start = timer()
    client = authentification()
    query_30_day(client)
    end = timer()
    print("Elapsed time for authentification and query ", end - start)


# volume testing
def test_volume_data():
    client = authentification()
    custome_query_30_day(client, ["#food", "#fashion"])
    dump_to_json(parsedTweets, "volume.json")


if __name__ == '__main__':
    load_dotenv("D:\\personal\\bird\\.env")
    test_query_time()
    test_volume_data()
