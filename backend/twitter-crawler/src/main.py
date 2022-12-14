import time
from rest_api_client import RestApiClient
from bird_migration_model import BirdMigrationModel
from bird_migration_models_generator import BirdMigrationModelsGenerator


PATH = "./special_info.json"
SLEEP_TIME_SECONDS = 1


def main():
    client = RestApiClient()
    generator = BirdMigrationModelsGenerator(PATH)

    models = generator.run()

    if None != models:
        for model in models:
            if client.post(model):
                print("Posted..")

            time.sleep(SLEEP_TIME_SECONDS)


if __name__ == '__main__': main()
