from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import sys
import sqlite3
from datetime import datetime
app = Flask(__name__)
cors = CORS(app)

if __name__ == "__main__":
    app.run(debug=True)

def get_database():
    conn = sqlite3.connect('database' + os.sep + 'baltimore_db.sqlite')
    conn.row_factory = sqlite3.Row
    return conn

def get_map_covid_cases_all():
    conn = get_database()
    cursor = conn.cursor()
    cursor.execute('SELECT zipcode.zipcode, lat AS lat, long AS long, \
                    SUM(total_cases) AS total_cases FROM covid_cases \
                    JOIN zipcode WHERE covid_cases.zipcode = zipcode.zipcode \
                    GROUP BY zipcode.zipcode')

    covid_list = []
    for i in cursor.fetchall():
        cases = {}
        cases["zipcode"] = i["zipcode"]
        cases["lat"] = i["lat"]
        cases["lng"] = i["long"]
        cases["count"] = i["total_cases"]
        covid_list.append(cases)
    return covid_list

def get_map_covid_cases_from_date(start_date, end_date):
    conn = get_database()
    cursor = conn.cursor()
    cursor.execute('SELECT zipcode.zipcode, zipcode.lat AS lat, \
                    zipcode.long AS long, SUM(total_cases) \
                    AS total_cases FROM zipcode JOIN covid_cases \
                    ON covid_cases.date BETWEEN ? AND ? \
                    WHERE covid_cases.zipcode = zipcode.zipcode \
                    GROUP BY zipcode.zipcode', (start_date, end_date))

    covid_list = []
    for i in cursor.fetchall():
        cases = {}
        cases["zipcode"] = i["zipcode"]
        cases["lat"] = i["lat"]
        cases["lng"] = i["long"]
        cases["count"] = i["total_cases"]
        covid_list.append(cases)
    return covid_list

def get_chart_covid_cases_by_date():
    conn = get_database()
    cursor = conn.cursor()
    cursor.execute('SELECT covid_cases.date AS date, SUM(total_cases) \
                    AS total_cases FROM zipcode JOIN covid_cases \
                    WHERE covid_cases.zipcode = zipcode.zipcode \
                    GROUP BY covid_cases.date')

    covid_list = {}
    for i in cursor.fetchall():
        key = i["date"]
        val = i["total_cases"]
        covid_list[key] = val
    return sorted(covid_list.items(), key = lambda x:datetime.strptime(x[0], '%d_%m_%Y'), reverse=False)

def get_map_crime_type(crime_type_code):
    conn = get_database()
    cursor = conn.cursor()
    cursor.execute('SELECT zipcode.zipcode, zipcode.lat AS lat, \
                    zipcode.long AS long, COUNT(*) AS crime_count FROM zipcode \
                    JOIN crime ON crime.type_code = ? \
                    WHERE crime.zipcode = zipcode.zipcode \
                    GROUP BY zipcode.zipcode', [crime_type_code]) # [] for single parameters

    crime_list = []
    for i in cursor.fetchall():
        crime = {}
        crime["zipcode"] = i["zipcode"]
        crime["lat"] = i["lat"]
        crime["lng"] = i["long"]
        crime["count"] = i["crime_count"]
        crime_list.append(crime)
    return crime_list

#TODO: MAKE THIS WORK
'''
def get_map_crime_type_from_date(crime_type_code, start_date, end_date):
    conn = get_database()
    cursor = conn.cursor()
    cursor.execute('SELECT zipcode.zipcode, zipcode.lat AS lat, \
                    zipcode.long AS long, COUNT(*) AS crime_count FROM zipcode \
                    JOIN crime ON crime.type_code = ? \
                    WHERE crime.zipcode = zipcode.zipcode \
                    GROUP BY zipcode.zipcode',
                    (crime_type_code, start_date, end_date))

    crime_list = []
    for i in cursor.fetchall():
        crime = {}
        crime["zipcode"] = i["zipcode"]
        crime["lat"] = i["lat"]
        crime["lng"] = i["long"]
        crime["count"] = i["crime_count"]
        crime_list.append(crime)
    return crime_list
'''

def get_map_zipcode_all():
    conn = get_database()
    cursor = conn.cursor()
    cursor.execute('SELECT zipcode, lat, long FROM zipcode')

    zipcodes = []
    for i in cursor.fetchall():
        entry = {}
        entry["zipcode"] = i["zipcode"]
        entry["lat"] = i["lat"]
        entry["lng"] = i["long"]
        zipcodes.append(entry)
    return zipcodes

def get_map_zipcode_lat_long(zipcode):
    conn = get_database()
    cursor = conn.cursor()
    cursor.execute('SELECT zipcode, lat, long FROM zipcode \
                    WHERE zipcode.zipcode = ?', [zipcode])

    zipcodes = []
    for i in cursor.fetchall():
        entry = {}
        entry["zipcode"] = i["zipcode"]
        entry["lat"] = i["lat"]
        entry["lng"] = i["long"]
        zipcodes.append(entry)
    return zipcodes

# DEFAULT MAP LOAD
@app.route('/api/map/covid_cases', methods=['GET'])
def api_get_map_covid_cases_all():
    return get_map_covid_cases_all()

# DATE FILTER FOR COVID
@app.route('/api/map/covid_cases/<start_date>/<end_date>', methods=['GET'])
def api_get_map_covid_cases_from_date(start_date, end_date):

    # format param dates from yyyy-mm-dd to mm_dd_yyyy
    if "-" in start_date:
        s_date = f"{start_date[5:7]}_{start_date[8:]}_{start_date[:4]}"
        e_date = f"{end_date[5:7]}_{end_date[8:]}_{end_date[:4]}"
        return get_map_covid_cases_from_date(s_date, e_date)

    return get_map_covid_cases_from_date(start_date, end_date)

@app.route('/api/chart/covid_cases/', methods=['GET'])
def api_get_chart_covid_cases_by_date():
    return get_chart_covid_cases_by_date()

# CRIME_TYPE_CODE FILTER FOR CRIME
@app.route('/api/map/crime/<crime_type_code>', methods=['GET'])
def api_get_map_crime_type(crime_type_code):
    # sum up total crime in each zipcode and return as arr of dicts: [{}, {}, {}, ...]
    return get_map_crime_type(crime_type_code)
'''
# CRIME_TYPE_CODE AND DATE FILTER FOR CRIME
@app.route('/api/map/crime/<crime_type_code>/<start_date>/<end_date>', methods=['GET'])
def api_get_map_crime_type_from_date(crime_type_code, start_date, end_date):
    if "-" in start_date:
        s_date = f"{start_date[5:7]}_{start_date[8:]}_{start_date[:4]}"
        e_date = f"{end_date[5:7]}_{end_date[8:]}_{end_date[:4]}"
        return get_map_crime_type_from_date(crime_type_code, s_date, e_date)
    return get_map_crime_type_from_date(crime_type_code, start_date, end_date)
'''
# GET ALL ZIPCODES
@app.route('/api/map/zipcode', methods=['GET'])
def api_map_get_zipcode_all():
    return get_map_zipcode_all()

# ZIPCODE LOOKUP
@app.route('/api/map/zipcode/<zipcode>', methods=['GET'])
def api_get_map_zipcode_lat_long(zipcode):
    return get_map_zipcode_lat_long(zipcode)
