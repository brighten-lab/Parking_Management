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
    sql = f"""SELECT * 
            FROM parking
            WHERE id IN(
            SELECT MAX(id) AS last_idx
            FROM parking
            WHERE ZONE=%s 
            group BY spot_number)
            ORDER BY spot_number ASC"""
    cursor.execute(sql, zone)
    result = cursor.fetchall()
    db.close()
    return jsonify(result)

@app.route('/avail', methods=['POST'])
def avail():
    zone = request.json.get('zone') 
    db = pymysql.connect(host='211.57.200.6', port=3306, user='root', password='willcam1190', db='park', charset='utf8')
    cursor = db.cursor()
    sql = f"""SELECT COUNT(*) 
            FROM parking
            WHERE id IN(
                SELECT MAX(id) AS last_idx
                FROM parking
                WHERE ZONE=%s 
                GROUP BY spot_number
            ) AND is_parked = 0
            ORDER BY spot_number ASC"""
    cursor.execute(sql, zone)
    result = cursor.fetchone()[0]
    db.close()
    return jsonify(result)

@app.route('/type', methods=['POST'])
def type():
    zone = request.json.get('zone') 
    type = request.json.get('type')
    db = pymysql.connect(host='211.57.200.6', port=3306, user='root', password='willcam1190', db='park', charset='utf8')
    cursor = db.cursor()
    sql = f"""SELECT COUNT(*) 
            FROM parking
            WHERE id IN(
                SELECT MAX(id) AS last_idx
                FROM parking
                WHERE ZONE=%s 
                GROUP BY spot_number
            ) AND is_parked = 0 AND type = %s
            ORDER BY spot_number ASC"""
    cursor.execute(sql, (zone, type))
    result = cursor.fetchone()[0]
    db.close()
    return jsonify(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)