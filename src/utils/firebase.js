const config = {
  apiKey: "qRFWQn2qfS5p9vx3LEMw1TC91HHFMsGPoOlFvnjL",
  authDomain: "website-b638a.firebaseapp.com",
  databaseURL: "https://website-b638a.firebaseio.com/",
};

const loadFirebase = async function () {
  const [module] = await Promise.all([
    import("@firebase/app"),
    import("@firebase/auth"),
    import("@firebase/database"),
    import("@firebase/messaging"),
  ]);
  return module.default;
};

const initializeFirebase = async () => {
  const firebase = await loadFirebase();
  return firebase.initializeApp(config);
};

export const firebase = initializeFirebase();
