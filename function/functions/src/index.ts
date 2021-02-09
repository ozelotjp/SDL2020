import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

// 車両番号　XY　向いている方向
export const storePosition = functions.https.onRequest((request, response) => {
  if (request.method !== 'POST') {
    response.status(405).send('Method Not Allowed');
    return;
  }
  let objectData = request.body;

  // 座標型に変換
  let nowGeoPoint = new admin.firestore.GeoPoint(objectData.latitude, objectData.longitude);

  // 車両の現在情報格納
  admin
  .firestore()
  .collection('cars')
  .doc(objectData.vin)
  .update({
    compass: objectData.compass,    // 車両方角
    blinker: objectData.blinker,    // ウィンカー
    position: nowGeoPoint             // 座標
  })
  .then((ref) => {

    // 所属グループを取得
    admin
      .firestore()
      .collection('cars')
      .doc(objectData.vin)
      .get()
      .then((column) => {

        let vinData = column.data();
        if(!vinData) return

        // ナビゲーションを取得
        return admin
          .firestore()
          .collection('groups')
          .doc(vinData.currentGroup)
          .get()
          .then((doc) => {
            let groupData = doc.data();
            if(!groupData) return;
            if(!vinData) return
            return admin
              .firestore()
              .collection('groups')
              .doc(vinData.currentGroup)
              .collection('leaderLog')
              .where("route", "==", nowGeoPoint)
              .get()
              .then((document) => {
                document.forEach(function(docker){
                  let documentData = docker.data();
                  if(!documentData)return
                  let route = 'STRAIGHT';

                  switch(documentData.leaderBlinker){
                    case "RIGHT":
                      route = 'RIGHT';
                      break;
                    case "LEFT":
                      route = 'LEFT';
                      break;
                    default:
                      break;
                  }

                  // レスポンス内容
                  let responseData = {
                    leaderCompass: documentData.leaderCompass,
                    leaderVin: documentData.leaderVin,
                    leaderBlinker: documentData.leaderBlinker,
                    route: route
                  };
                  // レスポンスを返す
                  response.status(200).send(responseData);
                })
                }).catch((error: any) => {
                  throw new Error(error);
                })
          })
          .catch((error) => {
            throw new Error(error);
          });
      })
      .catch((error) => {
        throw new Error(error);
      });
  })
  .catch((error) => {
    response.status(418).send(error);
  });

})
