from flask import Flask, request, jsonify
import os
import sys
import sqlite3
app = Flask(__name__)

if __name__ == "__main__":
    app.run(debug=True)

def get_database():
    conn = sqlite3.connect('database' + os.sep + 'baltimore_db.sqlite')
    conn.row_factory = sqlite3.Row
    return conn

def get_map_covid_cases_all():
    conn = get_database()
    cursor = conn.cursor()
    cursor.execute('SELECT lat AS lat, long AS long, sum(total_cases) as total_cases \
                    FROM covid_cases JOIN zipcode \
                    WHERE covid_cases.zipcode = zipcode.zipcode \
                    GROUP BY zipcode.zipcode')

    covid_list = []
    for i in cursor.fetchall():
        cases = {}
        cases["lat"] = i["lat"]
        cases["lng"] = i["long"]
        cases["count"] = i["total_cases"]
        covid_list.append(cases)
    return covid_list

def get_map_covid_cases_from_date(start_date, end_date):
    conn = get_database()
    cursor = conn.cursor()
    cursor.execute('SELECT zipcode.lat AS lat, zipcode.long AS long, sum(total_cases)  as total_cases\
                    FROM zipcode JOIN covid_cases ON covid_cases.date BETWEEN ? AND ? \
                    WHERE covid_cases.zipcode = zipcode.zipcode \
                    GROUP BY zipcode.zipcode', (start_date, end_date))

    covid_list = []
    for i in cursor.fetchall():
        cases = {}
        cases["lat"] = i["lat"]
        cases["lng"] = i["long"]
        cases["count"] = i["total_cases"]
        covid_list.append(cases)
    return covid_list

def get_map_crime_type(crime_type_code):
    conn = get_database()
    cursor = conn.cursor()
    cursor.execute('SELECT zipcode.lat AS lat, zipcode.long AS long, COUNT(*) AS crime_count \
                    FROM zipcode JOIN crime ON crime.type_code = ? \
                    WHERE crime.zipcode = zipcode.zipcode \
                    GROUP BY zipcode.zipcode', [crime_type_code]) # [] for single parameters

    crime_list = []
    for i in cursor.fetchall():
        crime = {}
        # omit zipcode because heatmap.js doesnt want it
        crime["lat"] = i["lat"]
        crime["lng"] = i["long"]
        crime["count"] = i["crime_count"]
        crime_list.append(crime)
    return crime_list

# DEFAULT MAP LOAD
@app.route('/api/map/covid_cases', methods=['GET'])
def api_get_map_covid_cases_all():
    return get_map_covid_cases_all()

# DATE FILTER FOR COVID
@app.route('/api/map/covid_cases/<start_date>/<end_date>', methods=['GET'])
def api_get_map_covid_cases_from_date(start_date, end_date):
    return get_map_covid_cases_from_date(start_date, end_date)

# CRIME_TYPE_CODE FILTER FOR CRIME
@app.route('/api/map/crime/<crime_type_code>', methods=['GET'])
def api_get_map_crime_type(crime_type_code):
    # sum up total crime in each zipcode and return as arr of dicts: [{}, {}, {}, ...]
    return get_map_crime_type(crime_type_code)
