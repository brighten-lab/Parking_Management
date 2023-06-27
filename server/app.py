from flask import Flask, request, jsonify
import pymysql

app = Flask(__name__)

@app.route('/list', methods=['POST'])
def list_parking():
    zone = request.json.get('zone') 
    db = pymysql.connect(host='211.57.200.6', port=3306, user='root', password='willcam1190', db='park', charset='utf8')
    cursor = db.cursor(pymysql.cursors.DictCursor)  # DictCursor를 사용하여 딕셔너리 형태로 결과를 반환
    sql = "SELECT * FROM parking WHERE zone = %s"
    cursor.execute(sql, zone)
    result = cursor.fetchall()
    db.close()

    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True)
