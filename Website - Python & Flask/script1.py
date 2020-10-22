from flask import Flask, render_template

app = Flask(__name__, static_url_path="/static")
t = 'Python Flask THREE.js'

@app.route('/')
def home():
    return render_template("index5.html", title=t, heading="Click Here", message="Hover over a box & hit refresh to rearrange")

@app.route('/one/')
def one():
    return render_template("index2.html", title=t, heading="Next", message="Click and drag to move around")

@app.route('/two/')
def two():
    return render_template("index3.html", title=t, heading="Click Here", message="Click and drag to move around")

@app.route('/three/')
def three():
    return render_template("index4.html", title=t, heading="Home", message="Wait for the color to change...")

if __name__ =="__main__":
    app.run(debug=True)
    # app.run(host='0.0.0.0', port=8080) <-- To deploy on AWS EC2 t2.micro Instance: ubuntu server http://54.172.103.79:8080