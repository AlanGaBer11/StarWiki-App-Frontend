import React, { useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonBackButton,
  IonTitle,
  IonContent,
  IonText,
  IonSkeletonText,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import { useParams } from "react-router";
import { usePostStore } from "../../store/postsStore";
import PostContent from "../../components/content/PostContent";

interface RouteParams {
  nombre_categoria: string;
  titulo_post: string;
}

const PostPage: React.FC = () => {
  const { titulo_post } = useParams<RouteParams>();
  const { selectedPost, fetchPostByTitle, loading, error } = usePostStore();

  useEffect(() => {
    const titulo = titulo_post.replaceAll("-", " ");
    fetchPostByTitle(titulo);
  }, [titulo_post, fetchPostByTitle]);

  // Extraemos la lógica del renderizado condicional en una variable
  let content;

  if (loading) {
    content = (
      <IonCard className="ion-padding">
        <IonSkeletonText
          animated
          style={{ width: "100%", height: "200px", borderRadius: "8px" }}
        />
        <IonCardHeader>
          <IonCardTitle className="ion-text-center">
            <IonSkeletonText animated style={{ width: "60%" }} />
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonSkeletonText animated style={{ width: "100%" }} />
          <IonSkeletonText animated style={{ width: "90%" }} />
          <IonSkeletonText animated style={{ width: "80%" }} />
          <IonSkeletonText animated style={{ width: "70%" }} />
        </IonCardContent>
      </IonCard>
    );
  } else if (error) {
    content = (
      <IonText color="danger">
        <p className="ion-text-center">{error}</p>
      </IonText>
    );
  } else if (selectedPost) {
    content = <PostContent post={selectedPost} />;
  } else {
    content = (
      <IonText color="medium">
        <p className="ion-text-center">No se encontró la publicación.</p>
      </IonText>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
            <IonBackButton
              defaultHref={`/posts/${selectedPost?.nombre_categoria || ""}`}
            />
          </IonButtons>
          <IonTitle>{selectedPost?.titulo || "Cargando..."}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {content}
      </IonContent>
    </IonPage>
  );
};

export default PostPage;
