import React from "react";
import {
  IonText,
  IonCard,
  IonChip,
  IonAvatar,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import {
  calendarOutline,
  calendarSharp,
  refreshOutline,
  refreshSharp,
} from "ionicons/icons";
import { PostData } from "../../data/postsData";
import "./PostContent.css";

interface PostContentProps {
  post: PostData;
}

const PostContent: React.FC<PostContentProps> = ({ post }) => {
  if (!post) {
    return <p>Cargando publicación...</p>;
  }

  return (
    <div className="post-container">
      <IonCard className="post-image-card">
        <img
          src={post.url_imagen || "https://via.placeholder.com/700x300"}
          alt={post.titulo || "Imagen del post"}
          className="post-image"
        />
      </IonCard>

      <h1>{post.titulo}</h1>

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
            Publicado: {post.fecha_publicacion || "Sin fecha"}
          </IonLabel>
        </IonChip>
        <IonChip color="medium">
          <IonIcon icon={refreshOutline} md={refreshSharp} />
          <IonLabel>
            Actualizado: {post.fecha_actualizacion || "Sin actualización"}
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
    </div>
  );
};

export default PostContent;
