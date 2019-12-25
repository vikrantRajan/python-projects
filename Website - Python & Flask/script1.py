from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("index2.html")

@app.route('/about/')
def about():
    return "<h1>About Page content goes here</h1>"

if __name__ =="__main__":
    app.run(debug=True)