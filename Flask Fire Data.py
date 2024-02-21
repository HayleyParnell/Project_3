from flask import Flask, jsonify
from flask import Flask, render_template
from flask_cors import CORS
from flask import Flask, send_file
import sqlite3


app = Flask(__name__)
CORS(app)

@app.route("/")
def home_page():
    return render_template('index.html')
    


@app.route('/data')
def get_data():
    # Connect to SQLite database
    conn = sqlite3.connect('fire_db')
    cursor = conn.cursor()
    
    # Execute SQL query
    cursor.execute('SELECT * FROM fire_data')
    data = cursor.fetchall()
    
    conn.close()

    return jsonify(data)

@app.route('/US')
def us_visualization():
    return render_template('Fire Visualization.html')

@app.route('/3D')
def globe_visualization():
    return render_template('map.html')

@app.route('/frp')
def get_image():
    return send_file('static/fire_incidents_3d_heatmap.png', mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)
