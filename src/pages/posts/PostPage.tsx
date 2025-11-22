import React, { useEffect, useRef } from "react";
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
  IonModal,
} from "@ionic/react";
import { useParams } from "react-router";
import { usePostStore } from "../../store/postsStore";
import { useCommentStore } from "../../store/commentStore";
import CreateCommentModal from "../../components/modals/CreateCommentModal";
import PostContent from "../../components/content/PostContent";

interface RouteParams {
  nombre_categoria: string;
  titulo_post: string;
}

const PostPage: React.FC = () => {
  const { titulo_post } = useParams<RouteParams>();
  const { selectedPost, fetchPostByTitle, loading, error } = usePostStore();
  const { comments, fetchCommentsByPost } = useCommentStore();
  const modal = useRef<HTMLIonModalElement>(null);

  useEffect(() => {
    const titulo = titulo_post.replaceAll("-", " ");
    fetchPostByTitle(titulo);
  }, [titulo_post, fetchPostByTitle]);

  useEffect(() => {
    if (selectedPost?.id) {
      fetchCommentsByPost(selectedPost.id);
    }
  }, [selectedPost, fetchCommentsByPost]);

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
            <br />
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonSkeletonText animated style={{ width: "100%" }} />
          <br />
          <IonSkeletonText animated style={{ width: "90%" }} />
          <br />
          <IonSkeletonText animated style={{ width: "80%" }} />
          <br />
          <IonSkeletonText animated style={{ width: "70%" }} />
          <br />
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
    content = (
      <PostContent
        post={selectedPost}
        comments={comments}
        onOpenModal={() => modal.current?.present()}
      />
    );
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
      <IonModal
        id="create-comment-modal"
        className="reusable-modal comment-modal"
        ref={modal}
      >
        {selectedPost && (
          <CreateCommentModal
            dismiss={() => modal.current?.dismiss()}
            initialPost={{ id: selectedPost.id!, titulo: selectedPost.titulo }}
          />
        )}
      </IonModal>
    </IonPage>
  );
};

export default PostPage;
