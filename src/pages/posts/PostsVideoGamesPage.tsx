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
  IonChip,
} from "@ionic/react";
import { useHistory } from "react-router";
import { usePostStore } from "../../store/postsStore";
import { PostData } from "../../data/postsData";
import "./PostsPages.css";

const PostsVideoGames: React.FC = () => {
  const { posts, fetchPostsByCategory, loading } = usePostStore();
  const history = useHistory();

  // Función para formatear la fecha
  const formatearFecha = (fechaString?: string) => {
    if (!fechaString) return "Fecha desconocida";
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long", // "noviembre" (usa "short" para "nov")
      day: "numeric",
    });
  };

  const handleLeerMas = (post: PostData) => {
    const nombre_categoria =
      post.Category?.nombre?.toLowerCase().replaceAll(/\s+/g, "-") || "general";
    const slug = post.titulo
      .normalize("NFD")
      .replaceAll(/[\u0300-\u036f]/g, "")
      .replaceAll(/[^a-zA-Z0-9\s-]/g, "")
      .toLowerCase()
      .replaceAll(/\s+/g, "-");
    history.push(`/post/${nombre_categoria}/${slug}`);
  };

  useEffect(() => {
    fetchPostsByCategory(2); // ID de categoría Videojuegos
  }, []);

  let content;

  if (loading) {
    //  Mostrar skeletons mientras carga
    const skeletonKeys = ["s1", "s2", "s3"];
    content = skeletonKeys.map((key) => (
      <IonCol size="12" sizeMd="4" key={key}>
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
              <IonSkeletonText animated={true} style={{ width: "40%" }} />
              <IonSkeletonText animated={true} style={{ width: "60%" }} />
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonSkeletonText animated={true} style={{ width: "90%" }} />
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
            <IonCardTitle className="ion-text-center" color="primary">
              <b>{post.titulo}</b>
            </IonCardTitle>
            <IonCardSubtitle>
              {post.User?.nombre_usuario || "Autor desconocido"}
              <IonChip color="secondary">
                {formatearFecha(post.fecha_publicacion)}
              </IonChip>
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            {post.contenido.length > 100
              ? post.contenido.slice(0, 100) + "..."
              : post.contenido}
          </IonCardContent>

          <IonButton expand="block" onClick={() => handleLeerMas(post)}>
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
