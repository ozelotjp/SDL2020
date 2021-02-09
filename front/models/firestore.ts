export type HasId = {
  id: string
}

/**
 * /users/${userId}
 */
export type User = {
  createdAt: firebase.firestore.Timestamp
}

/**
 * /users/${userId}/cars/${carId}
 */
export type UserCar = {
  name: string
  createdAt: firebase.firestore.Timestamp
}

/**
 * /groups/${groupId}
 */
export type Group = {
  name: string
  cars: string[]
  carsName: {
    [id: string]: string
  }
  parent: string
  createdAt: firebase.firestore.Timestamp
}

/**
 * /groups/${groupId}/cars/{$carId}
 */
export type GroupCar = {
  // below: not implement
  position: firebase.firestore.GeoPoint // 最終位置情報
  control: string // 最終操作情報  // FIXME
  updates: firebase.firestore.Timestamp // 最終更新時間
  created: firebase.firestore.Timestamp // 最終登録時間
}
