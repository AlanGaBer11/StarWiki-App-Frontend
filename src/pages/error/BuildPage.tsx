import React from "react";
import { IonPage, IonContent, IonButton, IonIcon, IonText } from "@ionic/react";
import {
  constructOutline,
  constructSharp,
  homeOutline,
  homeSharp,
} from "ionicons/icons";
import { Link } from "react-router-dom";
import "./ErrorPages.css";

const BuildPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <div className="error-container">
          <div className="error-icon">
            <IonIcon ios={constructOutline} md={constructSharp} />
          </div>

          <IonText>
            <h1>En Construcción</h1>
            <h2>Esta ruta está en desarrollo</h2>
            <p>
              Estamos trabajando arduamente para traerte esta funcionalidad muy
              pronto. ¡Gracias por tu paciencia!
            </p>
          </IonText>

          <div className="error-actions">
            <Link to="/">
              <IonButton color="primary" shape="round">
                <IonIcon ios={homeOutline} md={homeSharp} slot="start" />
                Volver al inicio
              </IonButton>
            </Link>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default BuildPage;
