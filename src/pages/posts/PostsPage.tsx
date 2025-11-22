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
import { usePostStore } from "../../store/postsStore"; // Importamos el store de posts

import PostsStarWars from "./PostsStarWarsPage";
import PostsVideoGames from "./PostsVideoGamesPage";
import PostsAnime from "./PostsAnimePage";
import "./PostsPage.css";

const PostsPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isAuthenticated, user, checkAuth } = useAuthStore();
  const { fetchPostsByCategory } = usePostStore(); // Obtenemos la función para recargar

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

  // Función para recargar los posts según la pestaña actual
  const handleRefreshPosts = () => {
    switch (categoria) {
      case "StarWars":
        fetchPostsByCategory(2);
        break;
      case "Anime":
        fetchPostsByCategory(4);
        break;
      case "Videojuegos":
        fetchPostsByCategory(5);
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
              {/* Eliminamos el ID y usamos onClick */}
              <IonFabButton onClick={() => setIsModalOpen(true)}>
                <IonIcon ios={addOutline} md={addSharp} />
              </IonFabButton>
            </IonFab>
          )}

        {/* Controlamos el modal con isOpen y onDidDismiss */}
        <IonModal
          id="create-modal"
          className="reusable-modal"
          isOpen={isModalOpen}
          onDidDismiss={() => setIsModalOpen(false)}
        >
          <CreatePostModal
            dismiss={() => setIsModalOpen(false)}
            onSuccess={handleRefreshPosts} // Pasamos la función de recarga
          />
        </IonModal>

        {renderContenido()}
      </IonContent>
    </IonPage>
  );
};

export default PostsPage;
