import os
import sqlite3
import pandas as pd
from datetime import datetime

"""conn = sqlite3.connect('baltimore_db.sqlite', check_same_thread=False)

conn.row_factory = sqlite3.Row
cursor = conn.cursor()
cursor.execute('SELECT zipcode.zipcode as zipcode FROM zipcode GROUP BY zipcode.zipcode')

zipcode = []
for i in cursor.fetchall():
    zipcode.append(i["zipcode"])

for z in zipcode:
    cursor.execute('SELECT date, total_cases FROM covid_cases WHERE zipcode = ? GROUP BY date', [z])
    cases = {}

    for i in cursor.fetchall():
        key = i["date"]
        val = i["total_cases"]
        cases[key] = val
    sorted_cases = sorted(cases.items(), key = lambda x:datetime.strptime(x[0], '%d_%m_%Y'), reverse=False)
    

    params = []
    prev = 0
    for p in sorted_cases:
        param = (abs(p[1]-prev), p[0], z)
        params.append(param)
        prev = p[1]
    print(params)        
    cur = conn.cursor()
    cur.executemany('UPDATE covid_cases SET total_cases = ? WHERE date = ? AND zipcode = ?', params)
    
    conn.commit()"""

