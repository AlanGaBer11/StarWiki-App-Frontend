import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonBackButton,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonSpinner,
} from "@ionic/react";

const CreatePostButton: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
            <IonBackButton defaultHref="/inicio" />
          </IonButtons>
          <IonTitle>Crear Post</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div>
          <IonItem className="ion-no-padding">
            <IonInput
              type="text"
              name="titulo"
              label="Titulo"
              labelPlacement="floating"
              placeholder="Titulo del post"
            />
          </IonItem>
          <IonItem className="ion-no-padding">
            <IonInput
              type="text"
              name="contenido"
              label="Contenido"
              labelPlacement="floating"
              placeholder="Contenido del post"
            />
          </IonItem>
          <IonItem className="ion-no-padding">
            <IonInput
              type="text"
              name="url_imagen"
              label="Url de la Imagen"
              labelPlacement="floating"
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </IonItem>
          <IonItem className="ion-no-padding">
            <IonSelect label="Categoría" labelPlacement="fixed">
              <IonSelectOption value="starWars">Star Wars</IonSelectOption>
              <IonSelectOption value="videojuegos">Videojuegos</IonSelectOption>
              <IonSelectOption value="anime">Anime</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonButton expand="block">Crear</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};
export default CreatePostButton;
