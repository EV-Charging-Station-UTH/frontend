import { useEffect, useState } from "react";
import { getMessaging, getToken } from "firebase/messaging";
import firebaseApp from "@/configs/firebase";

const useFcmToken = (): { fcmToken: string } => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        if (typeof window !== "undefined" && "serviceWorker" in navigator) {
          const messaging = getMessaging(firebaseApp);

          // Retrieve the notification permission status
          const permission = await Notification.requestPermission();

          // Check if permission is granted before retrieving the token
          if (permission === "granted") {
            const currentToken = await getToken(messaging, {
              vapidKey: process.env.FIREBASE_VAPID_KEY,
            });
            if (currentToken) {
              setToken(currentToken);
            } else {
              // console.log('No registration token available. Request permission to generate one.')
            }
          }
        }
      } catch (error) {
        // console.log('An error occurred while retrieving token:', error)
      }
    };

    retrieveToken();
  }, []);

  return { fcmToken: token };
};

export default useFcmToken;
