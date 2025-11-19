import React, { useEffect, useState, useRef } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonBackButton,
  IonTitle,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonIcon,
  IonFab,
  IonFabButton,
  IonModal,
} from "@ionic/react";
import CreatePostModal from "../../components/modals/CreatePostModal";
import { addOutline, addSharp } from "ionicons/icons";
import { useHistory, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

import PostsStarWars from "./PostsStarWarsPage";
import PostsVideoGames from "./PostsVideoGamesPage";
import PostsAnime from "./PostsAnimePage";
import "./PostsPage.css";

const PostsPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const modal = useRef<HTMLIonModalElement>(null);

  const { isAuthenticated, user, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const [categoria, setCategoria] = useState<
    "StarWars" | "Videojuegos" | "Anime"
  >("StarWars");

  // Detecta cambio en URL y sincroniza categoría
  useEffect(() => {
    if (location.pathname.includes("videojuegos")) {
      setCategoria("Videojuegos");
    } else if (location.pathname.includes("anime")) {
      setCategoria("Anime");
    } else {
      setCategoria("StarWars");
    }
  }, [location.pathname]);

  // Cambia URL al seleccionar un tab
  const handleSegmentChange = (value: "StarWars" | "Videojuegos" | "Anime") => {
    switch (value) {
      case "StarWars":
        history.push("/posts/star-wars");
        break;
      case "Videojuegos":
        history.push("/posts/videojuegos");
        break;
      case "Anime":
        history.push("/posts/anime");
        break;
    }
  };

  const renderContenido = () => {
    switch (categoria) {
      case "StarWars":
        return <PostsStarWars />;
      case "Videojuegos":
        return <PostsVideoGames />;
      case "Anime":
        return <PostsAnime />;
      default:
        return null;
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
            <IonBackButton defaultHref="/inicio" />
          </IonButtons>
          <IonTitle>Posts</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="segment">
          <IonSegment
            value={categoria}
            onIonChange={(e) =>
              handleSegmentChange(
                e.detail.value as "StarWars" | "Videojuegos" | "Anime"
              )
            }
          >
            <IonSegmentButton value="StarWars">
              <IonLabel>Star Wars</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="Videojuegos">
              <IonLabel>Videojuegos</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="Anime">
              <IonLabel>Anime</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </div>
        <div key={categoria} className="posts-container"></div>
        {/* Mostrar FAB solo si usuario autenticado y rol ADMIN o EDITOR */}
        {isAuthenticated &&
          user &&
          (user.rol === "ADMIN" || user.rol === "EDITOR") && (
            <IonFab
              vertical="bottom"
              horizontal="end"
              slot="fixed"
              className="create-fab"
            >
              <IonFabButton id="open-create-post">
                <IonIcon ios={addOutline} md={addSharp} />
              </IonFabButton>
            </IonFab>
          )}
        <IonModal id="create-post-modal" ref={modal} trigger="open-create-post">
          <CreatePostModal dismiss={() => modal.current?.dismiss()} />
        </IonModal>

        {renderContenido()}
      </IonContent>
    </IonPage>
  );
};

export default PostsPage;
