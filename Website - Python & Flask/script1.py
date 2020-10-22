from flask import Flask, render_template

app = Flask(__name__, static_url_path="/static")

@app.route('/')
def home():
    return render_template("index5.html")

@app.route('/about/')
def about():
    return render_template("index2.html")

if __name__ =="__main__":
    app.run(debug=True)