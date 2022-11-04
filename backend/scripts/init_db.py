import os
import sqlite3
import pandas as pd

if os.path.exists('baltimore_db.sqlite'):
    os.remove('baltimore_db.sqlite')

#TODO: Move these files out of the scripts folder
conn = sqlite3.connect('baltimore_db.sqlite', check_same_thread=False)

with open('schema.sql') as f:
    conn.executescript(f.read())

conn.commit()
conn.close()

print("Tables created successfully")

# scan for all MD_Covid_...csvs, loop each csv, each row, insert to covid_cases table
# load corresponding zipcodes and coordinates from geopy geocode to zipcode table
# zipcode array for tracking

path = '..' + os.sep + 'data' + os.sep

for csv in os.listdir(path):
    if "MD_Covid" in csv:
        table = pd.read_csv(path + csv)
        for i, row in table.iterrows():
            pass
        print(f"{csv} done")

# when loading crime data, check if coor reverese geocoded is in zipcode table; if not, add to zipcode table
# ^^^ to add any missing zipcodes missed from MD_Covid data

'''
table = pd.read_csv('../data/zipcodes_by_coor.csv')
cur = conn.cursor()
for i, row in table.iterrows():
    # do stuff
    print(row)
'''
