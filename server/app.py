from flask import Flask, request, jsonify
import pymysql
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/list', methods=['POST'])
def list():
    zone = request.json.get('zone') 
    db = pymysql.connect(host='211.57.200.6', port=3306, user='root', password='willcam1190', db='park', charset='utf8')
    cursor = db.cursor(pymysql.cursors.DictCursor)  # DictCursor를 사용하여 딕셔너리 형태로 결과를 반환
    sql = "SELECT * FROM parking WHERE zone = %s"
    cursor.execute(sql, zone)
    result = cursor.fetchall()
    db.close()
    return jsonify(result)

@app.route('/total', methods=['POST'])
def total():
    zone = request.json.get('zone') 
    db = pymysql.connect(host='211.57.200.6', port=3306, user='root', password='willcam1190', db='park', charset='utf8')
    cursor = db.cursor()
    sql = "SELECT count(id) FROM parking WHERE zone= %s;"
    cursor.execute(sql, zone)
    result = cursor.fetchone()[0]
    db.close()
    return jsonify(result)

@app.route('/avail', methods=['POST'])
def avail():
    zone = request.json.get('zone') 
    db = pymysql.connect(host='211.57.200.6', port=3306, user='root', password='willcam1190', db='park', charset='utf8')
    cursor = db.cursor()
    sql = "SELECT count(id) FROM parking WHERE zone= %s AND is_parked= 0;"
    cursor.execute(sql, zone)
    result = cursor.fetchone()[0]
    db.close()
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
