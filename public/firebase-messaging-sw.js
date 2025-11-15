// public/firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBk8gCCeb3gJEeO4O3kZG6HrNBMVRRV0b4",
  authDomain: "e-wallet-da28e.firebaseapp.com",
  projectId: "e-wallet-da28e",
  storageBucket: "e-wallet-da28e.firebasestorage.app",
  messagingSenderId: "565944352871",
  appId: "1:565944352871:web:b08c87e8274820bd8b14c2",
  measurementId: "G-0VYL2PHE1K"
});

const messaging = firebase.messaging();

// Xử lý background messages
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
