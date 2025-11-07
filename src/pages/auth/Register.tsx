import React, { FormEvent, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonBackButton,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonItem,
  IonInput,
  IonInputPasswordToggle,
  IonButton,
  IonText,
  useIonRouter,
  IonLabel,
  IonSpinner,
} from "@ionic/react";
import { useAuthStore } from "../../store/useAuthStore";
import "./Auth.css";
import ToastService from "../../services/ToastService";

interface RegisterData {
  nombre: string;
  apellido: string;
  nombre_usuario: string;
  email: string;
  contrasena: string;
  confrimar_contrasena: string;
}

const Register: React.FC = () => {
  const { register } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(false);
  // Estado del formulario
  const [formData, setFormData] = useState<RegisterData>({
    nombre: "",
    apellido: "",
    nombre_usuario: "",
    email: "",
    contrasena: "",
    confrimar_contrasena: "",
  });
  const router = useIonRouter();

  // Manejo de cambios en los inputs
  const handleChange = (e: CustomEvent): void => {
    const target = e.target as HTMLIonInputElement;
    const name = target.name as keyof RegisterData;
    const value = (e.detail.value ?? "") as string;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Función para validar la contraseña
  const validateContrasena = (): boolean => {
    if (formData.contrasena !== formData.confrimar_contrasena) {
      ToastService.error("Las contraseñas no coinciden");
      return false;
    }
    if (formData.contrasena.length < 8) {
      ToastService.error("La contraseña debe tener al menos 8 caracteres");
      return false;
    }
    return true;
  };

  // Manejo de envio del formulario
  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    try {
      setLoading(true);

      if (!validateContrasena()) {
        return;
      }

      await register(
        formData.nombre,
        formData.apellido,
        formData.nombre_usuario,
        formData.email,
        formData.contrasena
      );
      ToastService.success(
        "Cuentra creada exitosamente, por favor inicia sesión"
      );
      router.push("/login");
    } catch (error: any) {
      ToastService.error(error.message || "Error al crear la cuneta");
    } finally {
      setLoading(false);
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
          <IonTitle>Crear cuenta</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <div className="auth-container">
          <IonCard className="auth-card">
            <IonCardContent>
              <div className="auth-logo">StarWiki</div>

              <div className="input-row">
                <IonItem className="ion-no-padding">
                  <IonInput
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onIonInput={handleChange}
                    required
                    label="Nombre"
                    labelPlacement="floating"
                    placeholder="Tu nombre"
                  />
                </IonItem>
                <IonItem className="ion-no-padding">
                  <IonInput
                    type="text"
                    label="Apellido"
                    name="apellido"
                    value={formData.apellido}
                    onIonInput={handleChange}
                    labelPlacement="floating"
                    placeholder="Tu apellido"
                  />
                </IonItem>
              </div>

              <div className="input-row">
                <IonItem className="ion-no-padding">
                  <IonInput
                    type="text"
                    label="Nombre de Usuario"
                    name="nombre_usuario"
                    value={formData.nombre_usuario}
                    onIonInput={handleChange}
                    labelPlacement="floating"
                    placeholder="Tu nombre de usuario"
                  />
                </IonItem>
                <IonItem className="ion-no-padding">
                  <IonInput
                    type="email"
                    label="Correo"
                    name="email"
                    value={formData.email}
                    onIonInput={handleChange}
                    labelPlacement="floating"
                    placeholder="tucorreo@ejemplo.com"
                  />
                </IonItem>
              </div>

              <IonItem className="ion-no-padding">
                <IonInput
                  type="password"
                  label="Contraseña"
                  name="contrasena"
                  className="contrasena"
                  value={formData.contrasena}
                  onIonInput={handleChange}
                  labelPlacement="floating"
                  placeholder="••••••••"
                >
                  <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                </IonInput>
              </IonItem>

              <IonItem className="ion-no-padding">
                <IonInput
                  type="password"
                  label="Confirmar Contraseña"
                  name="confrimar_contrasena"
                  value={formData.confrimar_contrasena}
                  onIonInput={handleChange}
                  labelPlacement="floating"
                  placeholder="••••••••"
                >
                  <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                </IonInput>
              </IonItem>

              <IonButton
                type="submit"
                expand="block"
                className="ion-margin-top"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    <IonLabel>Creando Cuenta</IonLabel>
                    <IonSpinner name="dots" />
                  </div>
                ) : (
                  "Crear Cuenta"
                )}
              </IonButton>

              <div className="auth-footer">
                <IonText>¿Ya tienes cuenta?</IonText>
                <IonButton fill="clear" size="small" routerLink="/login">
                  Iniciar sesión
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
