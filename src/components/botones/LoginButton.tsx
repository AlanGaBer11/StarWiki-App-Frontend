import React, { useEffect } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import {
  logInOutline,
  logOutOutline,
  logInSharp,
  logOutSharp,
} from "ionicons/icons";
import { useAuthStore } from "../../store/useAuthStore";

const LoginButton: React.FC = () => {
  const { isAuthenticated, user, logout, checkAuth } = useAuthStore();

  // Verifica autenticación al cargar el componente
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isAuthenticated && user) {
    return (
      <IonButton color="danger" expand="block" onClick={logout}>
        Cerrar sesión
        <IonIcon slot="end" ios={logOutOutline} md={logOutSharp}></IonIcon>
      </IonButton>
    );
  }

  return (
    <div>
      <IonButton expand="block" color="primary" routerLink="/login">
        Iniciar Sesión
        <IonIcon slot="end" ios={logInOutline} md={logInSharp}></IonIcon>
      </IonButton>
    </div>
  );
};

export default LoginButton;
