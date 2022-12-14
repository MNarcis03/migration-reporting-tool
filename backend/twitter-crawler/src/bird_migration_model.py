class BirdMigrationModel:
    __species = None
    __appearances = None
    __location = None
    __latitude = None
    __longitude = None
    __FIELDS = 5


    def __init__(self, _species=None, _appearances=None,
        _location=None, _latitude=None, _longitude=None):
        self.__species = _species
        self.__appearances = _appearances
        self.__location = _location
        self.__latitude = _latitude
        self.__longitude = _longitude


    def set_model(self, _species, _appearances,
        _location, _latitude, _longitude):
        if (None != _species and None != _appearances and
            None != _location and
            None != _latitude and None != _longitude
        ):
            self.__species = _species
            self.__appearances = _appearances
            self.__location = _location
            self.__latitude = _latitude
            self.__longitude = _longitude

            return True

        return False


    def get_model(self):
        model = dict()

        while True:
            if None != self.__species:
                model["species"] = self.__species
            else: break

            if None != self.__appearances:
                model["appearances"] = self.__appearances
            else: break

            if None != self.__location:
                model["location"] = self.__location
            else: break

            if None != self.__latitude:
                model["latitude"] = self.__latitude
            else: break

            if None != self.__longitude:
                model["longitude"] = self.__longitude
            else: break

            if len(model) == self.__FIELDS:
                return model
            else: break

        return None
