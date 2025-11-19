// CreatePostModal.tsx
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
import { useCategoryStore } from "../../store/categoryStore";
import { usePostStore } from "../../store/postsStore";
import "./CreatePostModal.css";

const CreatePostModal: React.FC<{ dismiss: () => void }> = ({ dismiss }) => {
  const [data, setData] = useState({
    titulo: "",
    contenido: "",
    url_imagen: "",
  });

  const [selectedCategoryId, setSelectedCategoryId] = useState<number>();

  const {
    categories,
    fetchCategories,
    loading: loadingCategories,
  } = useCategoryStore();
  const { createPost, loading: loadingPosts } = usePostStore();

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e: CustomEvent) => {
    const target = e.target as HTMLIonInputElement;
    const name = target.name as keyof typeof data;
    const value = e.detail.value ?? "";

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    if (
      !data.titulo ||
      !data.contenido ||
      !data.url_imagen ||
      !selectedCategoryId
    ) {
      return ToastService.error("Todos los campos son obligatorios");
    }

    const categoria = categories.find((c) => c.id === selectedCategoryId);
    if (!categoria) return ToastService.error("Categoría inválida");

    try {
      await createPost({
        titulo: data.titulo,
        contenido: data.contenido,
        url_imagen: data.url_imagen,
        nombre_categoria: categoria.nombre,
      });

      ToastService.success("Post creado correctamente");
      dismiss();
    } catch (error: any) {
      ToastService.error(error.message || "Error al crear el post");
    }
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={dismiss}>Cancelar</IonButton>
          </IonButtons>
          <IonTitle>Crear Post</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <form onSubmit={handleSubmit}>
          <IonItem className="create-post-item">
            <IonInput
              name="titulo"
              value={data.titulo}
              onIonChange={handleChange}
              label="Título"
              labelPlacement="floating"
            />
          </IonItem>

          <IonItem className="create-post-item">
            <IonInput
              name="contenido"
              value={data.contenido}
              onIonChange={handleChange}
              label="Contenido"
              labelPlacement="floating"
            />
          </IonItem>

          <IonItem className="create-post-item">
            <IonInput
              name="url_imagen"
              value={data.url_imagen}
              onIonChange={handleChange}
              label="URL Imagen"
              labelPlacement="floating"
            />
          </IonItem>

          <IonItem className="create-post-item">
            {loadingCategories ? (
              <IonSpinner />
            ) : (
              <IonSelect
                label="Categoría"
                value={selectedCategoryId}
                onIonChange={(e) => setSelectedCategoryId(e.detail.value)}
              >
                {categories.map((cat) => (
                  <IonSelectOption key={cat.id} value={cat.id}>
                    {cat.nombre}
                  </IonSelectOption>
                ))}
              </IonSelect>
            )}
          </IonItem>

          <IonButton
            expand="block"
            type="submit"
            className="create-post-button"
          >
            {loadingPosts ? <IonSpinner /> : "Crear"}
          </IonButton>
        </form>
      </IonContent>
    </>
  );
};

export default CreatePostModal;
