from flask import Flask, request, redirect, render_template
import sys
app = Flask(__name__)

if __name__ == "__main__":
    app.run(debug=True)
