const firebaseConfig = {
  apiKey: "AIzaSyDdsuLq-ZGHUr9HSN2VMgpnfAXXD0ao8vA",
  authDomain: "retdit-clone.firebaseapp.com",
  projectId: "retdit-clone",
  storageBucket: "retdit-clone.appspot.com",
  messagingSenderId: "1048184023080",
  appId: "1:1048184023080:web:28b551d3ca41fc4923ed1d",
  measurementId: "G-LXW42EHDR1",
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

const calculateElapsedTime = (timeCreated) => {
  const created = new Date(timeCreated).getTime();
  let periods = {
    năm: 365 * 30 * 24 * 60 * 60 * 1000,
    tháng: 30 * 24 * 60 * 60 * 1000,
    tuần: 7 * 24 * 60 * 60 * 1000,
    ngày: 24 * 60 * 60 * 1000,
    giờ: 60 * 60 * 1000,
    phút: 60 * 1000,
  };
  let diff = Date.now() - created;

  for (const key in periods) {
    if (diff >= periods[key]) {
      let result = Math.floor(diff / periods[key]);
      return `${result} ${result === 1 ? key : key + ""} trước`;
    }
  }

  return "Vừa xong";
};
