import { IonPage, IonContent, IonButton, IonIcon, IonText } from "@ionic/react";
import {
  arrowBackOutline,
  lockClosedOutline,
  arrowBackSharp,
  lockClosedSharp,
} from "ionicons/icons";
import { Link } from "react-router-dom";
import "./ErrorPages.css";

const UnauthorizedPage = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <div className="error-container">
          <div className="error-icon">
            <IonIcon ios={lockClosedOutline} md={lockClosedSharp} />
          </div>

          <IonText>
            <h1>Error 403</h1>
            <h2>Acceso denegado</h2>
            <p>No tienes permisos para acceder a este módulo.</p>
          </IonText>

          <div className="error-actions">
            <Link to="/">
              <IonButton color="primary" shape="round">
                <IonIcon
                  ios={arrowBackOutline}
                  md={arrowBackSharp}
                  slot="start"
                />
                Volver atrás
              </IonButton>
            </Link>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UnauthorizedPage;
