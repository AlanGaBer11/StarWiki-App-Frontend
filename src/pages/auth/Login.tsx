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
  IonSpinner,
  IonText,
  useIonRouter,
  IonLabel,
} from "@ionic/react";
import ToastService from "../../services/ToastService";
import { useAuthStore } from "../../store/useAuthStore";
import "./Auth.css";

interface LoginData {
  email: string;
  contrasena: string;
}

const Login: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuthStore();
  // Estado del formulario
  const [credentials, setCredentials] = useState<LoginData>({
    email: "",
    contrasena: "",
  });

  const router = useIonRouter();

  // Manejar cambios de los inputs
  const handleChange = (e: CustomEvent): void => {
    const target = e.target as HTMLIonInputElement;
    const name = target.name as keyof LoginData;
    const value = (e.detail.value ?? "") as string;

    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejar envio del formulario
  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    try {
      setLoading(true);
      await login(credentials.email, credentials.contrasena);
      ToastService.success("Inicio de sesión exitoso");
      router.push("/inicio");
    } catch (error: any) {
      ToastService.error(error.message || "Error al iniciar sesión");
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
          <IonTitle>Iniciar sesión</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding ">
        <div className="auth-container">
          <IonCard className="auth-card">
            <IonCardContent>
              <div className="auth-logo">StarWiki</div>

              <IonItem className="ion-no-padding">
                <IonInput
                  type="email"
                  name="email"
                  value={credentials.email}
                  onIonInput={handleChange}
                  required
                  label="Correo"
                  labelPlacement="floating"
                  placeholder="tucorreo@ejemplo.com"
                />
              </IonItem>

              <IonItem className="ion-no-padding">
                <IonInput
                  type="password"
                  name="contrasena"
                  value={credentials.contrasena}
                  onIonInput={handleChange}
                  label="Contraseña"
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
                    <IonLabel>Iniciando Sesión</IonLabel>
                    <IonSpinner name="dots" />
                  </div>
                ) : (
                  "Iniciar Sesión"
                )}
              </IonButton>

              <div className="auth-footer">
                <IonText>¿No tienes cuenta?</IonText>
                <IonButton fill="clear" size="small" routerLink="/register">
                  Crear cuenta
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
