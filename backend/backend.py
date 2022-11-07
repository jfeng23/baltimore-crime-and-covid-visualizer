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

def get_covid_cases_from_date(start_date, end_date):
    conn = get_database()
    cursor = conn.cursor()
    cursor.execute('SELECT zipcode.lat AS lat, zipcode.long AS long, \
                    total_cases FROM covid_cases JOIN zipcode WHERE \
                    covid_cases.date BETWEEN ? AND ? AND covid_cases.zipcode \
                    = zipcode.zipcode',
                    (start_date, end_date))
    covid_cases_list = []
    for i in cursor.fetchall():
        covid_cases = {}
        covid_cases["lat"] = i["lat"]
        covid_cases["long"] = i["long"]
        covid_cases["total_cases"] = i["total_cases"]
        covid_cases_list.append(covid_cases)
    return covid_cases_list

def get_covid_cases():
    conn = get_database()
    cursor = conn.cursor()
    cursor.execute('SELECT lat AS lat, long AS long, \
                    total_cases FROM covid_cases JOIN zipcode WHERE \
                    covid_cases.zipcode = zipcode.zipcode')
    covid_cases_list = []
    for i in cursor.fetchall():
        covid_cases = {}
        covid_cases["lat"] = i["lat"]
        covid_cases["long"] = i["long"]
        covid_cases["total_cases"] = i["total_cases"]
        covid_cases_list.append(covid_cases)
    return covid_cases_list

@app.route('/api/covid_cases', methods=['GET'])
def api_get_all_covid_cases():
    return get_covid_cases()

@app.route('/api/covid_cases/<start_date>/<end_date>', methods=['GET'])
def api_get_covid_cases(start_date, end_date):
    return get_covid_cases_from_date(start_date, end_date)
