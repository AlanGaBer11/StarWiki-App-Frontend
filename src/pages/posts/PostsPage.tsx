import React, { useEffect, useState } from "react";
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
} from "@ionic/react";
import { useHistory, useParams } from "react-router-dom";

import PostsStarWars from "./PostsStarWars";
import PostsVideoGames from "./PostsVideoGames";
import PostsAnime from "./PostsAnime";
import "./PostsPage.css";

// Tipado de los parámetros de la URL
interface RouteParams {
  nombre_categoria?: string;
}

const PostsPage: React.FC = () => {
  const history = useHistory();
  const { nombre_categoria } = useParams<RouteParams>();

  // Estado del tab actual
  const [categoria, setCategoria] = useState<
    "StarWars" | "Videojuegos" | "Anime"
  >("StarWars");

  // Sincroniza el estado con la URL al entrar
  useEffect(() => {
    if (nombre_categoria) {
      switch (nombre_categoria.toLowerCase()) {
        case "star-wars":
          setCategoria("StarWars");
          break;
        case "videojuegos":
          setCategoria("Videojuegos");
          break;
        case "anime":
          setCategoria("Anime");
          break;
        default:
          setCategoria("StarWars");
      }
    }
  }, [nombre_categoria]);

  // Cambiar URL cuando el usuario cambia el tab
  const handleSegmentChange = (value: "StarWars" | "Videojuegos" | "Anime") => {
    setCategoria(value);
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

  // Render dinámico según tab
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
        {/* Tabs fuera del Header */}
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

        {/* Renderizado dinámico */}
        <div className="posts-container">{renderContenido()}</div>
      </IonContent>
    </IonPage>
  );
};

export default PostsPage;
