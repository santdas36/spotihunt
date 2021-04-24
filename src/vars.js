import {db} from "./firebase";

const vars = async () => {
  return await db.collection('config').get().then((res) => res.docs[0].data())
}

export { vars }
