import requests
from dotenv import dotenv_values
from singleton_meta import SingletonMeta
from bird_migration_model import BirdMigrationModel


class RestApiClient(metaclass = SingletonMeta):
    __HOST = None
    __PORT = None
    __ROUTE = None
    __url = None


    def __init__(self):
        self.__HOST = "http://127.0.0.1"
        self.__PORT = "3000"
        self.__ROUTE = "/birdMigration"
        self.__url = self.__HOST + ":" + self.__PORT + self.__ROUTE


    def post(self, _model):
        if isinstance(_model, BirdMigrationModel):
            model = _model.get_model()

            if None != model:
                if None != self.__url:
                    req = requests.post(url=self.__url, json=model)
                    return True
                else: print("Invalid URL!")
            else: print("Invalid JSON!")
        else: print("Invalid PARAMETER!")

        return False
