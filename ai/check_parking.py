import pymysql
import cv2
from ultralytics import YOLO
import time


# 주차장 좌표 정보 리스트
pklot_coords = [
    # P1          P2          P3          P4
    [(552, 507), (631, 519),  (657, 458), (576, 455)],
    [(577, 456), (657, 459),  (682, 402), (603, 402)],
    [(604, 402), (682, 402),  (706, 348), (627, 353)],
    [(627, 354), (706, 349),  (727, 298), (649, 308)],
    [(649, 308), (726, 300),  (746, 253), (670, 267)],
    [(670, 267), (745, 254),  (763, 215), (689, 229)],
    [(689, 229), (764, 215),  (780, 178), (707, 195)],
    [(708, 196), (780, 178),  (793, 145), (724, 162)],
    [(725, 162), (793, 145),  (805, 115), (738, 133)],
    [(738, 132), (805, 116),  (817, 88),  (752, 105)],
    [(752, 105), (816, 88),   (827, 65),  (764, 82)],
    [(764, 82),  (827, 64),   (837, 41),  (773, 62)],
    [(785, 467), (914, 473),  (932, 398), (809, 399)],
    [(808, 402), (932, 402),  (946, 335), (830, 339)],
    [(829, 341), (947, 338),  (954, 277), (847, 287)],
    [(847, 288), (954, 279),  (961, 221), (861, 236)]
    ]

# 연결 설정
config = {
    'user': 'root',
    'password': 'willcam1190',
    'host': '211.57.200.6',
    'port': 3306,
    'database': 'park'
}

# 연결
conn = pymysql.connect(**config)
# 커서 생성
cur = conn.cursor()

# Load the YOLOv8 model
model = YOLO('/home/parking/Parking_Management/ai/best.pt')

# webcam 사용시
#cap = cv2.VideoCapture(0)
cap = cv2.VideoCapture('rtsp://kbs:willcam1190@kbs.iptimecam.com:21088/stream_ch00_0')

# 현재 시간과 이전 시간의 차이로 FPS를 조절 
prev_time = 0   # 이전 프레임 재생 루프에서의 시간
fps = 0.2       # FPS, 0.2 fps = 5초당 1프레임

# video loop, take one frame for prediction in every 5 sec
while cap.isOpened():
    
    # Read a frame from the video
    success, frame = cap.read()

    # 현재 시간에서 이전 루프의 시간에서 뺀 시간을 계산
    current_time = time.time() - prev_time

    if success:
        # current_time이 5보다 커지면(fps = 0.2) 예측 수행
        if current_time > 1./fps :

            # 이전 프레임 재생 루프에서의 시간을 지정
            prev_time = time.time()

            # 학습된 YOLOv8 모델로 해당 프레임에 대해 예측 수행
            results = model.predict(frame, conf = 0.3, save = False, line_width = 1)

            # 탐지된 차량 박스의 중심점을 저장하는 리스트
            boxes_center_list = []

            # 이미지에서 탐지된 객체의 박스 정보 확인
            for bbox_tf in results[0].boxes:
                # 각 바운딩 박스의 중심점(x, y)과 너비, 높이를 출력 : xywh 속성은 박스의 중심점과 너비, 높이를 반환함
                bbox_xywh = bbox_tf.xywh.cpu().numpy()
                # 박스 중심 점의 x좌표 값이 500 이상인 박스만
                if bbox_xywh[0][0] >= 500:
                    # 차량의 중심점을 계산하여 xy_list에 저장 : y좌표의 경우 박스 높이의 1/5 지점으로 설정
                    xy = (bbox_xywh[0][0], bbox_xywh[0][1] + 0.3 * bbox_xywh[0][3])
                    boxes_center_list.append(xy)

            # bbox = results[0].boxes.data.numpy()
            # for i in range(len(bbox)):
            #     if bbox[i].data[0]>=500: #좌표가 500이 넘을때만  
            #         h = bbox[i].data[3] - bbox[i].data[1]
            #         leng = (bbox[i].data[0] + bbox[i].data[2]) / 2
            #         heig = (bbox[i].data[3])-(h*0.2)
            #         boxes_center_list.append((leng, heig))  # (leng, heig) 형태의 튜플을 배열에 추가

            # 주차 자리가 찼는지 아닌지를 저장하는 boolean 리스트
            pklot_spaces_isfull = [False for _ in range(len(pklot_coords))]
            # update 될 값들을 저장하는 list
            update_values = []
            # 주차장 자리별로 비교 수행
            for i, pkspace in enumerate(pklot_coords):
                # 주차된 상태 : 1, 비어있는 상태 : 0
                state = 0   # 주차 자리가 비어있는 상태
                ymin = (pkspace[2][1]+pkspace[3][1])/2
                ymax = (pkspace[0][1]+pkspace[1][1])/2
                xmin = (pkspace[0][0]+pkspace[3][0])/2
                xmax = (pkspace[1][0]+pkspace[2][0])/2
                for xy in boxes_center_list:
                    # 탐지된 차량 박스 중심이 주차 칸의 x 범위와 y 범위 내에 위치하는지 확인
                    # 범위 내 위치한다면 주차 상태로 변환
                    if ((xmin <= xy[0]) and (xmax >= xy[0]))\
                        and ((ymin <= xy[1]) and (ymax >= xy[1])):
                            state = 1   # 주차된 상태로 변경
                            pklot_spaces_isfull[i] = True
                            # print(f"Space No.{i} is Full!")
                            break
                # DB에 update할 리스트에 추가
                update_values.append([state, i, 'A'])
            # print(update_values)

            # UPDATE 쿼리문
            query = "UPDATE parking SET is_parked = %s WHERE spot_number = %s AND zone = %s"
            try:
                # 다중 행을 한번에 update
                cur.executemany(query, update_values)
            except Exception as e:
                # 오류 시 롤백
                print("Failed to update records to database: {}".format(e))
                conn.rollback()
            # 변경사항 저장
            conn.commit()
            print(pklot_spaces_isfull)
    else:
        print('video reading failed! try reopen...')
        cap = cv2.VideoCapture('rtsp://kbs:willcam1190@kbs.iptimecam.com:21088/stream_ch00_0')
        if not cap.isOpened():
            print('opening webcam is failed. pls check out if your webcam is closed.')
            break


# DB Connection 및 커서 닫기
cur.close()
conn.close()

# Release the video capture object and close the display window
cap.release()
