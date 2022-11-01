import os
import sqlite3
import pandas as pd

if os.path.exists('baltimore_db.sqlite'):
    os.remove('baltimore_db.sqlite')

conn = sqlite3.connect('baltimore_db.sqlite', check_same_thread=False)

conn.execute('''DROP TABLE IF EXISTS zipcode''')
conn.execute('''
    CREATE TABLE zipcode (
        zipcode INTEGER NOT NULL,
        lat INTEGER NOT NULL,
        long INTEGER NOT NULL,

        PRIMARY KEY (zipcode)
    );
''')
conn.commit()

conn.execute('''DROP TABLE IF EXISTS covid_cases''')
conn.execute('''
    CREATE TABLE covid_cases (
        row_id INTEGER NOT NULL,
        zipcode INTEGER NOT NULL,
        date TEXT NOT NULL,
        total_cases INTEGER NOT NULL,

        PRIMARY KEY (row_id)
        FOREIGN KEY (zipcode) REFERENCES zipcode(zipcode)
    );
''')
conn.commit()

conn.execute('''DROP TABLE IF EXISTS crime''')
conn.execute('''
    CREATE TABLE crime (
        row_id INTEGER NOT NULL,
        long INTEGER NOT NULL,
        lat INTEGER NOT NULL,
        date TEXT NOT NULL,
        type_code TEXT NOT NULL,
        type TEXT NOT NULL,

        PRIMARY KEY (row_id)
    );
''')
conn.commit()


print("Tables created successfully")


table = pd.read_csv('../data/zipcodes_by_coor.csv')
cur = conn.cursor()
for i, row in table.iterrows():
    # do stuff
    print(row)