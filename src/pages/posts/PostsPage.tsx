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
import { useHistory, useLocation } from "react-router-dom";

import PostsStarWars from "./PostsStarWarsPage";
import PostsVideoGames from "./PostsVideoGamesPage";
import PostsAnime from "./PostsAnimePage";
import "./PostsPage.css";

const PostsPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

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

        <div key={categoria} className="posts-container">
          {renderContenido()}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PostsPage;
