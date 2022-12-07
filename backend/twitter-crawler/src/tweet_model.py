class TweetModel:
    __tweet_id = None
    __caption = None
    __image_url = None
    __location = None
    __time_and_date = None
    __bird_species = None


    def __init__(self, 
        _tweet_id, _caption, _image_url, 
        _location, _time_and_date, _bird_species):
        self.__tweet_id = _tweet_id 
        self.__caption = _caption
        self.__image_url = _image_url
        self.__location = _location
        self.__time_and_date = _time_and_date
        self.__bird_species = _bird_species


    def get_data(self):
        data = dict()
        FIELDS = 6

        while True:
            if None != self.__tweet_id:
                data["tweet_id"] = self.__tweet_id
            else: break

            if None != self.__caption:
                data["caption"] = self.__caption
            else: break

            if None != self.__image_url:
                data["image_url"] = self.__image_url
            else: break

            if None != self.__location:
                data["location"] = self.__location
            else: break

            if None != self.__time_and_date:
                data["time_and_date"] = self.__time_and_date
            else: break
            
            if None != self.__bird_species:
                data["bird_species"] = self.__bird_species
            else: break

            if len(data) == FIELDS:
                return data
            else: break

        return None
