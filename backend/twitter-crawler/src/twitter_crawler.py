import crawler

# FACADE PATTERN
class TwitterClawler(Crawler):
    def __init__(self):
        self.twitter_api = None
        self.data = None
        self.api_key = None
        self.filters = None

    def authenticate(self, auth_file_path=None):
        pass

    def request_data(self, tag, start_time, end_time, location):
        pass

    def filter_data(self):
        pass

    def export_data_as_json(self, path):
        pass

    def crawl(self):
        pass

    #OBSERVER
    def monitor_for_new_posts(self):
        pass
