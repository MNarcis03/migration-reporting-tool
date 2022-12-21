import json
import os.path
import random
from singleton_meta import SingletonMeta
from bird_migration_model import BirdMigrationModel


class BirdMigrationModelsGenerator(metaclass = SingletonMeta):
    __APPEARANCES_KEY = "total_number"
    __LOCATION_KEY = "location"
    __LATITUDE_KEY = "latitude"
    __LONGITUDE_KEY = "longitude"
    __DATE_KEY = "date"
    __path = None


    def __init__(self, _path):
        self.__path = _path


    def __validate_path(self):
        if (
            None != self.__path and
            os.path.exists(self.__path) and
            os.path.isfile(self.__path) and
            os.path.splitext(self.__path)[1] == ".json"
        ):
            return True
        else: print("Invalid self.__path!")

        return False


    def __load(self):
        data = None

        with open(self.__path) as fd:
            data = json.load(fd)

        return data

    
    def __generate_date(self):
        date = None

        year = "2022"
        month = str(random.randint(1, 12))
        day = str(random.randint(10, 28))

        if 1 == len(month):
            month = "0" + month

        date = year + "-" + month + "-" + day

        return date


    def __filter(self, _item):
        appearances = None
        location = None
        latitude = None
        longitude = None
        species = ""
        date = None

        for key, value in _item.items():
            if self.__APPEARANCES_KEY == key:
                appearances = value
            elif self.__LOCATION_KEY == key:
                location = value
            elif self.__LATITUDE_KEY == key:
                latitude = value
            elif self.__LONGITUDE_KEY == key:
                longitude = value
            else: # Append SPECIES_KEY
                species += key

        date = self.__generate_date()

        return species, appearances, location, latitude, longitude, date


    def __generate(self, _species, _appearances,
        _location, _latitude, _longitude, _date):
        model = BirdMigrationModel()

        generated = model.set_model(_species, _appearances,
            _location, _latitude, _longitude, _date)

        if generated: return model
        else: return None


    def run(self):
        models = list()

        if True == self.__validate_path():
            data = self.__load()

            if None != data:
                for item in data:
                    species, appearances, location, latitude, longitude, date = self.__filter(item)
                    model = self.__generate(species, appearances, location, latitude, longitude, date)

                    if None != model:
                        models.append(model)

        if len(models) > 0: return models
        else: return None


