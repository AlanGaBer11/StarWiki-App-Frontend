import React, { useEffect } from "react";
import {
  IonText,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonAvatar,
  IonLabel,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { useAuthStore } from "../../store/useAuthStore";
import {
  calendarOutline,
  calendarSharp,
  refreshOutline,
  refreshSharp,
} from "ionicons/icons";
import { PostData } from "../../data/postsData";
import { CommentData } from "../../data/commentData";
import "./PostContent.css";
import logo from "/icon/logo.png";

interface PostContentProps {
  post: PostData;
  comments: CommentData[];
  onOpenModal: () => void;
}

const PostContent: React.FC<PostContentProps> = ({
  post,
  comments,
  onOpenModal,
}) => {
  const { isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (!post) {
    return <p>Cargando publicación...</p>;
  }

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

  return (
    <div className="post-container">
      <IonCard className="post-image-card">
        <img
          src={post.url_imagen || "https://via.placeholder.com/700x300"}
          alt={post.titulo || "Imagen del post"}
          className="post-image"
        />
      </IonCard>

      <div className="post-meta">
        <IonAvatar>
          <img
            src={
              post.User?.avatar_url ||
              "https://api.dicebear.com/9.x/identicon/svg?seed=Anon"
            }
            alt="avatar"
          />
        </IonAvatar>
        <div className="meta-text">
          <IonText color="dark">
            <h3>{post.User?.nombre_usuario || "Usuario desconocido"}</h3>
          </IonText>
          <IonText color="medium">
            <p>{post.User?.email || "Sin correo"}</p>
          </IonText>
        </div>
      </div>

      <div className="post-dates">
        <IonChip color="medium">
          <IonIcon icon={calendarOutline} md={calendarSharp} />
          <IonLabel>
            Publicado: {formatearFecha(post.fecha_publicacion) || "Sin fecha"}
          </IonLabel>
        </IonChip>
        <IonChip color="medium">
          <IonIcon icon={refreshOutline} md={refreshSharp} />
          <IonLabel>
            Actualizado:{" "}
            {formatearFecha(post.fecha_actualizacion) || "Sin actualización"}
          </IonLabel>
        </IonChip>
      </div>

      <IonChip color="primary" className="ion-margin-vertical">
        <IonLabel>{post.Category?.nombre || "Sin categoría"}</IonLabel>
      </IonChip>

      <div className="post-body">
        <IonText>
          <p>{post.contenido || "Sin contenido disponible"}</p>
        </IonText>
      </div>
      <div className="comentarios-container">
        <div>
          <h2>Comentarios</h2>
        </div>

        {isAuthenticated && (
          <IonButton onClick={onOpenModal} expand="block">
            Crear Comentario
          </IonButton>
        )}

        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <IonCard key={comment.id} className="comment-card">
              <div className="comment-wrapper">
                <IonAvatar className="comment-avatar">
                  <img alt="Avatar" src={comment.User?.avatar_url || logo} />
                </IonAvatar>

                <div className="comment-content">
                  <IonCardHeader className="comment-header">
                    <IonCardTitle className="comment-username">
                      {comment.User?.nombre_usuario || "Usuario desconocido"}
                    </IonCardTitle>
                    <IonCardSubtitle className="comment-date">
                      {comment.fecha_creacion}
                    </IonCardSubtitle>
                  </IonCardHeader>

                  <IonCardContent className="comment-text">
                    {comment.contenido}
                  </IonCardContent>
                </div>
              </div>
            </IonCard>
          ))
        ) : (
          <IonText color="medium">
            <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
          </IonText>
        )}
      </div>
    </div>
  );
};

export default PostContent;
