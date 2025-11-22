import React, { useState, useEffect, FormEvent } from "react";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonSpinner,
} from "@ionic/react";

import ToastService from "../../services/ToastService";
import { useCommentStore } from "../../store/commentStore";
import { usePostStore } from "../../store/postsStore";
import "./CreateModal.css";

interface CreateCommentModalProps {
  dismiss: () => void;
  initialPost?: { id: number; titulo: string }; // Nueva prop opcional
}

const CreateCommentModal: React.FC<CreateCommentModalProps> = ({
  dismiss,
  initialPost,
}) => {
  const [data, setData] = useState({
    contenido: "",
  });

  // Inicializamos con el ID del post si existe
  const [selectedPostId, setSelectedPostId] = useState<number | undefined>(
    initialPost?.id
  );

  const { createComment, loading: loadingComments } = useCommentStore();
  const { posts, fetchPosts, loading: loadingPosts } = usePostStore();

  useEffect(() => {
    // Solo cargamos la lista de posts si NO estamos en un post específico
    if (!initialPost) {
      fetchPosts();
    }
  }, [initialPost]); // Agregamos initialPost a dependencias

  const handleChange = (e: CustomEvent) => {
    const target = e.target as HTMLIonInputElement;
    const name = target.name as keyof typeof data;
    const value = e.detail.value ?? "";

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    if (!data.contenido || !selectedPostId) {
      return ToastService.error("Todos los campos son obligatorios");
    }

    // Determinamos el título del post
    let tituloPost = "";
    if (initialPost && initialPost.id === selectedPostId) {
      tituloPost = initialPost.titulo;
    } else {
      const post = posts.find((c) => c.id === selectedPostId);
      if (!post) return ToastService.error("Post inválido");
      tituloPost = post.titulo;
    }

    try {
      await createComment({
        titulo_post: tituloPost,
        contenido: data.contenido,
      });

      ToastService.success("Comentario creado correctamente");
      dismiss();
    } catch (error: any) {
      ToastService.error(error.message || "Error al crear el comentario");
    }
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={dismiss}>Cancelar</IonButton>
          </IonButtons>
          <IonTitle>Crear Comentario</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <form onSubmit={handleSubmit}>
          <IonItem className="create-item">
            {initialPost ? (
              // Si hay post inicial, mostramos un input de solo lectura
              <IonInput
                label="Post"
                value={initialPost.titulo}
                readonly
                labelPlacement="floating"
              />
            ) : loadingPosts ? (
              <IonSpinner name="dots" />
            ) : (
              <IonSelect
                label="Post"
                value={selectedPostId}
                onIonChange={(e) => setSelectedPostId(e.detail.value)}
              >
                {posts.map((post) => (
                  <IonSelectOption key={post.id} value={post.id}>
                    {post.titulo}
                  </IonSelectOption>
                ))}
              </IonSelect>
            )}
          </IonItem>
          <IonItem className="create-item">
            <IonInput
              name="contenido"
              value={data.contenido}
              onIonChange={handleChange}
              label="Contenido"
              labelPlacement="floating"
            />
          </IonItem>

          <IonButton expand="block" type="submit" className="create-button">
            {loadingComments ? <IonSpinner name="dots" /> : "Crear"}
          </IonButton>
        </form>
      </IonContent>
    </>
  );
};

export default CreateCommentModal;
