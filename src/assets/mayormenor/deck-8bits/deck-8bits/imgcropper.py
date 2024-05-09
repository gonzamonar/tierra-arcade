from PIL import Image
import numpy as np
import os

for _, dirs, files in os.walk(os.getcwd()):
    for filename in files:
        if filename.endswith(".png"):
            print("Processing " + filename)

            img = Image.open(f'./{filename}').convert("RGBA")

            box = (263, 137, 422, 354)
            img2 = img.crop(box)

            img_arr = np.array(img2)

            #top left
            img_arr[0 : 4, 0 : 9] = (0, 0, 0, 0)
            img3 = Image.fromarray(img_arr)

            img_arr[0 : 9, 0 : 4] = (0, 0, 0, 0)
            img3 = Image.fromarray(img_arr)

            #bottom left
            img_arr[207 : 217, 0 : 4] = (0, 0, 0, 0)
            img3 = Image.fromarray(img_arr)

            img_arr[212 : 217, 0 : 9] = (0, 0, 0, 0)
            img3 = Image.fromarray(img_arr)

            #bottom right
            img_arr[207 : 217, 154 : 159] = (0, 0, 0, 0)
            img3 = Image.fromarray(img_arr)

            img_arr[212 : 217, 150 : 159] = (0, 0, 0, 0)
            img3 = Image.fromarray(img_arr)

            #top right
            img_arr[0 : 4, 149 : 159] = (0, 0, 0, 0)
            img3 = Image.fromarray(img_arr)

            img_arr[0 : 9, 154 : 159] = (0, 0, 0, 0)
            img3 = Image.fromarray(img_arr)

            #img3.show() 
            img3.save(f'./Cropped/{filename}')


