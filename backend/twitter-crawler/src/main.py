import time
from rest_api_client import RestApiClient
from bird_migration_model import BirdMigrationModel
from bird_migration_models_generator import BirdMigrationModelsGenerator


PATH = "../data/clusters.json"
SLEEP_TIME_SECONDS = 1


def main():
    client = RestApiClient()
    generator = BirdMigrationModelsGenerator(PATH)
    returnStatus = True

    models = generator.run()

    if None != models:
        for model in models:
            if client.post(model):
                print("Posted..")
            else: returnStatus = False

            time.sleep(SLEEP_TIME_SECONDS)

    if returnStatus: print("Test SUCCESS!")
    else: print("Test FAILED!")


if __name__ == '__main__': main()
