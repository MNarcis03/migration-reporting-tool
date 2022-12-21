from PIL import Image
import numpy as np
from scipy import spatial
import json
from tw import dump_to_json
from urllib.request import urlopen


def cos_similarity(file1, url):
    similarity = 0
    try:
        img1 = Image.open(file1)
        img2 = Image.open(urlopen(url))

        # make sure images have same dimensions, use .resize to scale image 2 to match image 1 dimensions
        # i am also reducing the shape by half just to save some processing power

        img1_reshape = img1.resize((round(img1.size[0] * 0.5), round(img1.size[1] * 0.5)))
        img2_reshape = img2.resize((round(img1.size[0] * 0.5), round(img1.size[1] * 0.5)))

        # convert the images to (R,G,B) arrays

        img_array1 = np.array(img1_reshape)
        img_array2 = np.array(img2_reshape)

        # flatten the arrays so they are 1 dimensional vectors

        img_array1 = img_array1.flatten()
        img_array2 = img_array2.flatten()

        # divide the arrays by 255, the maximum RGB value to make sure every value is on a 0-1 scale

        img_array1 = img_array1 / 255
        img_array2 = img_array2 / 255

        similarity = -1 * (spatial.distance.cosine(img_array1, img_array2) - 1)
    except:
        print(file1, url)
    return similarity


def image_filter(file):
    img_filter = []
    with open(file) as json_file:
        data = json.load(json_file)
    for d in data:
        img2 = d["image"]
        if len(img2) > 0 and d["type"] not in ["#bird", "#birds, #mig-here", "#waterbird", '#waterbirds']:
            img1 = d["type"][1:] + ".png"
            if cos_similarity(img1, img2) >= 0.7:
                img_filter.append(d)
        else:
            img_filter.append(d)
    dump_to_json(img_filter, 'filter_image.json')


if __name__ == '__main__':
    image_filter('birds-image.json')
