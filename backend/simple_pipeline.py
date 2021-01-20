import numpy as np  # linear algebra
import pandas as pd  # data processing, CSV file I/O (e.g. pd.read_csv)
from sklearn.ensemble import RandomForestClassifier

df = pd.read_csv('./train-iris.csv')
df2 = pd.read_csv('./eval-iris.csv')

X = df.drop('Species', axis=1)
y = df['Species']

clf = RandomForestClassifier(max_depth=2, random_state=0)
clf.fit(X, y)

X2 = df2.drop('Species', axis=1)
y2 = df2['Species']
Y2_predicted = clf.predict(X2)

print(Y2_predicted)
y2_list = y2.tolist()

counter = 0
for i in range(len(y2)):
    if y2_list[i] == Y2_predicted[i]:
        counter = counter + 1

print(counter/len(y2) * 100)
