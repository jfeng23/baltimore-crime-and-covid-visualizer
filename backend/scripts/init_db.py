import os
import sqlite3
import pandas as pd
from geopy.geocoders import Nominatim

if os.path.exists('baltimore_db.sqlite'):
    os.remove('baltimore_db.sqlite')

#TODO: Move these files out of the scripts folder
conn = sqlite3.connect('baltimore_db.sqlite', check_same_thread=False)

with open('schema.sql') as f:
    conn.executescript(f.read())

conn.commit()

print("Tables created successfully")

# scan for all MD_Covid_...csvs, loop each csv, each row, insert to covid_cases table
# load corresponding zipcodes and coordinates from geopy geocode to zipcode table
# zipcode array for tracking

path = '..' + os.sep + 'data' + os.sep

zipcodes = []

def get_zipcode_from_address(address):
    geolocator = Nominatim(user_agent="bccv")
    location = geolocator.geocode(address)
    zipcode = location.address.split(",")[-2].strip()
    return zipcode

for csv in os.listdir(path):
    if "MD_Covid" in csv:
        if "2020" in csv: year = "2020"
        elif "2021" in csv: year = "2021"
        elif "2022" in csv: year = "2022"

        table = pd.read_csv(path + csv)
        for i, row in table.iterrows():
            # row.col is the format for accessing each column / attribute
            zip = row.ZIP_CODE
            zipcodes.append(zip)
            for i in range(1, 12):
                if i < 10: month = f"0{i}"
                month_date = f"total{month}_1_{year}"
                print(month_date)
                try:
                    date = row.month_date
                except:
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
