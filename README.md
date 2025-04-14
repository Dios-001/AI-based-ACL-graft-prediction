# Graft Size Prediction for torn/ruptured Anterior Cruciate Ligament

## Overview

The anterior cruciate ligament (ACL) is a ligament in the knee that connects the thighbone to the shinbone. It's one of the main ligaments that stabilize the knee. In the United States, there are an estimated 100,000 to 200,000 ACL tears per year. The ACL, or anterior cruciate ligament, is the most commonly injured knee ligament, accounting for a significant portion of all knee injuries. This translates to about 1 in 3,500 people experiencing an ACL injury annually. the aim of the project is to create a model to predict autograft needed for surgery

## Purpose :

1. Perform classification on Knee MRI ((1) healthy, (2) partially injured, or (3) completely ruptured). [Dataset](https://www.kaggle.com/datasets/sohaibanwaar1203/kneemridataset/code)

2. Predict the size of autograft needed for surgery.

## Setup:

1. Create an virtual python enviroment (i'm using python 3.12.8)
   ```
   python -m venv Acl-predictor
   cd Acl-predictor
   ```
2. Activate the virtual enviroment. this is os dependent so i'll the part to reader but its generally `source /bin/activate` for macOS/linux user and `.\Scripts\activate.bat` for windows user.

3. load the [KneeMRIdataset](https://www.kaggle.com/datasets/sohaibanwaar1203/kneemridataset/code) in the folder. (im using cURl but alternate like kagglehub can be used too.)

```
curl -L -o ~/Downloads/kneemridataset.zip\
  https://www.kaggle.com/api/v1/datasets/download/sohaibanwaar1203/kneemridataset
```
