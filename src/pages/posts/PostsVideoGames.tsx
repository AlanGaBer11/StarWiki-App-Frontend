import React, { useEffect } from "react";
import {
  IonGrid,
  IonCol,
  IonRow,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonSkeletonText,
  IonButton,
} from "@ionic/react";
import { usePostStore } from "../../store/postsStore";
import "./Posts.css";

const PostsVideoGames: React.FC = () => {
  const { posts, fetchPostsByCategory, loading } = usePostStore();

  useEffect(() => {
    fetchPostsByCategory(5); // ID de categoría Videojuegos
  }, []);

  let content;

  if (loading) {
    // Mostrar skeletons mientras carga
    content = Array.from({ length: 3 }).map((_, i) => (
      <IonCol size="12" sizeMd="4" key={i}>
        <IonCard className="posts-cards ion-padding">
          <IonSkeletonText
            animated={true}
            style={{ width: "100%", height: "180px" }}
          />
          <IonCardHeader>
            <IonCardTitle className="ion-text-center">
              <IonSkeletonText animated={true} style={{ width: "80%" }} />
            </IonCardTitle>
            <IonCardSubtitle className="ion-text-center">
              <IonSkeletonText animated={true} style={{ width: "60%" }} />
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonSkeletonText animated={true} style={{ width: "90%" }} />
            <IonSkeletonText animated={true} style={{ width: "70%" }} />
          </IonCardContent>
          <IonButton expand="block" disabled>
            <IonSkeletonText animated={true} style={{ width: "50%" }} />
          </IonButton>
        </IonCard>
      </IonCol>
    ));
  } else if (posts.length > 0) {
    //  Mostrar posts reales
    content = posts.map((post) => (
      <IonCol size="12" sizeMd="4" key={post.id}>
        <IonCard className="posts-cards ion-padding">
          <img src={post.url_imagen} alt={post.titulo} />
          <IonCardHeader>
            <IonCardTitle className="ion-text-center">
              <b>{post.titulo}</b>
            </IonCardTitle>
            <IonCardSubtitle className="ion-text-center">
              {post.User?.nombre_usuario || "Autor desconocido"}
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>{post.contenido}</IonCardContent>
          <IonButton routerLink={`/posts/${post.id}`} expand="block">
            Leer más
          </IonButton>
        </IonCard>
      </IonCol>
    ));
  } else {
    //  Sin posts
    content = (
      <IonCol size="12">
        <p
          className="ion-text-center"
          style={{ color: "var(--ion-color-danger)" }}
        >
          No hay posts disponibles en esta categoría por el momento.
        </p>
      </IonCol>
    );
  }

  return (
    <div>
      <h1>Posts de Videojuegos</h1>

      <IonGrid>
        <IonRow>{content}</IonRow>
      </IonGrid>
    </div>
  );
};

export default PostsVideoGames;
