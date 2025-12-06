import React, { useEffect } from "react";
import { IonApp, IonSplitPane, setupIonicReact } from "@ionic/react";
import { SplashScreen } from "@capacitor/splash-screen";
import AppRouter from "./router/AppRouter";
import Toast from "./components/toast/Toast";
import { NotificationAPIProvider } from "@notificationapi/react";
import IndexedDBService from "./services/IndexedDBService";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => {
  useEffect(() => {
    const initApp = async () => {
      await IndexedDBService.init();
      SplashScreen.show({ autoHide: true, showDuration: 3000 });
    };
    initApp();
  }, []);
  return (
    <IonApp>
      {/* Notificaciones Push */}
      <NotificationAPIProvider
        userId="alangaber11@gmail.com"
        clientId="xr4b0rf8wmw1bklzdunze6nh16"
        webPushOptInMessage={true}
        customServiceWorkerPath="/sw.js"
      >
        {/* Envolvemos todo en el split pane (menú lateral)*/}
        <IonSplitPane contentId="main">
          <AppRouter /> {/* Componente de Router */}
        </IonSplitPane>
        <Toast />
      </NotificationAPIProvider>
    </IonApp>
  );
};

export default App;
