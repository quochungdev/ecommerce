importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

//the Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyAkitH_-XOQhUTfYZgcfMVCuWBEMi7zZ7w",
  authDomain: "notification-ecommerce.firebaseapp.com",
  projectId: "notification-ecommerce",
  storageBucket: "notification-ecommerce.appspot.com",
  messagingSenderId: "766229168485",
  appId: "1:766229168485:web:377752b0f07f47822a218c",
  measurementId: "G-CD9DWT1Z16",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
