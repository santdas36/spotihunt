import {db} from "./firebase";

const vars = async () => {
  const config = await db.collection('config').get().then((res) => res.docs[0].data());
  console.log(config);
  return config;
}

export { vars }
