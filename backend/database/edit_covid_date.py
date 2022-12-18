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
    cursor.execute('SELECT date FROM covid_cases WHERE zipcode = ? GROUP BY date', [z])
    dates = {}

    for i in cursor.fetchall():
        key = i["date"]
        val = 0
        dates[key] = val
    sorted_cases = sorted(dates.items(), key = lambda x:datetime.strptime(x[0], '%d_%m_%Y'), reverse=False)
    
    # old date: mm_dd_yyyy, new date: yyyy/mm/dd 00:00:00+00
    params = []
    for p in sorted_cases:
        old_date = p[0]
        new_date = f"{old_date[6:]}/{old_date[:2]}/{old_date[3:5]} 00:00:00+00"
        param = (new_date, old_date, z)
        params.append(param)
    print(params)        
    cur = conn.cursor()
    cur.executemany('UPDATE covid_cases SET date = ? WHERE date = ? AND zipcode = ?', params)
    
    conn.commit()"""

