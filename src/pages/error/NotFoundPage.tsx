import { IonPage, IonContent, IonButton, IonIcon, IonText } from "@ionic/react";
import { homeOutline, mapOutline, homeSharp, mapSharp } from "ionicons/icons";
import { Link } from "react-router-dom";
import "./ErrorPages.css";

const NotFoundPage = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <div className="error-container">
          <div className="error-icon">
            <IonIcon ios={mapOutline} md={mapSharp} />
          </div>

          <IonText>
            <h1>Error 404</h1>
            <h2>Ruta no encontrada</h2>
            <p>La página que estás buscando no existe o ha sido movida.</p>
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

export default NotFoundPage;
