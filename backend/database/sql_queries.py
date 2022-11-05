import os
import sqlite3
import pandas as pd

conn = sqlite3.connect('baltimore_db.sqlite', check_same_thread=False)

def sql_query(query):
    cur = conn.cursor()
    cur.execute(query)
    rows = cur.fetchall()
    return rows