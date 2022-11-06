import os
import sqlite3
import pandas as pd
import math
import time
from geopy.geocoders import Nominatim
import itertools
import csv
import time

if os.path.exists('baltimore_db.sqlite'):
    os.remove('baltimore_db.sqlite')

#TODO: Move these files out of the scripts folder
conn = sqlite3.connect('baltimore_db.sqlite', check_same_thread=False)

with open('schema.sql') as f:
    conn.executescript(f.read())
conn.commit()

print("Tables created successfully")

zipcode_lookup = {} # Dictionary containing geocoded address/zipcode pairs
zipcodes = []

def check_zipcode_table(zip, geolocator):
    global zipcodes
    if zip not in zipcodes:
        zipcodes.append(zip)
        # geocode for long and lat
        location = geolocator.geocode(f"{zip}, Maryland, USA")

        params = (zip, location.latitude, location.longitude)
        cur = conn.cursor()
        cur.execute('INSERT OR IGNORE INTO zipcode (zipcode, lat, long) VALUES(?, ?, ?)', params)

def get_zipcode_from_coordinates(address, lat, long, geolocator):
    global zipcode_lookup
    # Check if address was already geocoded to avoid duplicate geocoding
    if address not in zipcode_lookup:
        location = geolocator.reverse(f"{lat}, {long}")
        zipcode = location.raw['address']['postcode']
        zipcode_lookup[address] = zipcode

    return zipcode_lookup[address]


# ----------------------load all csv files into db----------------------

# scan for all MD_Covid_...csvs, loop each csv, each row, insert to covid_cases table
# load corresponding zipcodes and coordinates from geopy geocode to zipcode table
# zipcode array for tracking

# when loading crime data, check if coor reverese geocoded is in zipcode table; if not, add to zipcode table
# ^^^ to add any missing zipcodes missed from MD_Covid data

PATH = '..' + os.sep + 'data' + os.sep

print("Loading tables into sql...\n")
for csv in os.listdir(PATH):
    print(f"Loading {csv}...")
    start = time.perf_counter()

    # load COVID total_cases into db

    if "MD_Covid" in csv:
        if "2020" in csv: year = "2020"
        elif "2021" in csv: year = "2021"
        elif "2022" in csv: year = "2022"

        geolocator = Nominatim(user_agent="jfeng3@umbc.edu", timeout = 60)

        table = pd.read_csv(PATH + csv)
        for i, row in table.iterrows():
            # row.col OR row[col]
            zip = int(row.ZIP_CODE)
            if 21201 <= zip and zip <= 21298:
                # create row in zipcode table if it doesnt exist
                check_zipcode_table(zip, geolocator)

                # grab months 01 to 12 for each zipcode
                params = []
                for i in range(1, 13):
                    if i < 10: m = f"0{i}"
                    else: m = i

                    try:
                        date = f"total{m}_01_{year}"
                        case_count = row[date]

                        if not math.isnan(case_count):
                            param = (date[5:], case_count, zip)
                            params.append(param)
                    except:
                        continue
                cur = conn.cursor()
                cur.executemany('INSERT INTO covid_cases (date, total_cases, zipcode) VALUES(?, ?, ?)', params)

    # load CRIME_part_1 into db

    if "Part_1_Crime" in csv:
        table = pd.read_csv(PATH + csv, low_memory=False)
        geolocator = Nominatim(user_agent="jfeng3@umbc.edu", timeout = 60)

        # Load values from each row and insert in chunks
        params = []
        for i, row in table.iterrows():
            longitude = row.X
            latitude = row.Y
            date = row.CrimeDateTime
            code = row.CrimeCode
            type = row.Description
            address = row.Location

            # Skip the entry if there is no location information
            if not address.strip():
                continue
            try:
                zipcode = get_zipcode_from_coordinates(address, latitude, longitude, geolocator)
            except:
                continue
            check_zipcode_table(zipcode, geolocator)

            param = (longitude, latitude, date, code, type, zipcode)
            params.append(param)

            # Add to database
            if i % 1000 == 0:
                cur = conn.cursor()
                cur.executemany('INSERT INTO crime (long, lat, date, type_code, type, zipcode) \
                                 VALUES(?, ?, ?, ?, ?, ?)', params)
                
                print(f"crime_part1 batch # {i} inserted")
                params = []
        cur = conn.cursor()
        cur.executemany('INSERT INTO crime (long, lat, date, type_code, type, zipcode) \
                         VALUES(?, ?, ?, ?, ?, ?)', params)

    end = time.perf_counter()
    print(f"{csv} : Done : Elapsed time: {end - start}\n")

conn.commit()

"""
cur = conn.cursor()
cur.execute("SELECT * FROM crime")
rows = cur.fetchall()
print(rows)"""

conn.close()

# ----------------------data loaded----------------------
'''
table = pd.read_csv('../data/zipcodes_by_coor.csv')
cur = conn.cursor()
for i, row in table.iterrows():
    # do stuff
    print(row)
'''
