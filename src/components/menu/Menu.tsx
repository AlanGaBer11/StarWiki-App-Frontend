import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonImg,
  IonMenu,
  IonMenuToggle,
  IonAvatar,
} from "@ionic/react";

import logo from "/icon/logo.png";

import { useLocation } from "react-router";
import {
  homeOutline,
  homeSharp,
  videocamOutline,
  videocamSharp,
  gameControllerOutline,
  gameControllerSharp,
  tvOutline,
  tvSharp,
  bookmarkOutline,
  bookmarkSharp,
  personCircleOutline,
  personCircleSharp,
  settingsOutline,
  settingsSharp,
} from "ionicons/icons";
import DarkModeToggle from "../dark-mode-toggle/DarkModeToggle";
import LoginButton from "../botones/LoginButton";
import { useAuthStore } from "../../store/useAuthStore";
import "./Menu.css";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Inicio",
    url: "/inicio",
    iosIcon: homeOutline,
    mdIcon: homeSharp,
  },
  {
    title: "Star Wars",
    url: "/star-wars",
    iosIcon: videocamOutline,
    mdIcon: videocamSharp,
  },
  {
    title: "Videojuegos",
    url: "/videojuegos",
    iosIcon: gameControllerOutline,
    mdIcon: gameControllerSharp,
  },
  {
    title: "Anime",
    url: "/anime",
    iosIcon: tvOutline,
    mdIcon: tvSharp,
  },
];

const publicPages: AppPage[] = [
  {
    title: "Posts",
    url: "/posts",
    iosIcon: bookmarkOutline,
    mdIcon: bookmarkSharp,
  },
];

const userPages: AppPage[] = [
  {
    title: "Perfil",
    url: "/perfil",
    iosIcon: personCircleOutline,
    mdIcon: personCircleSharp,
  },
];

const adminPages: AppPage[] = [
  {
    title: "Panel de Administrador",
    url: "/admin",
    iosIcon: settingsOutline,
    mdIcon: settingsSharp,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, user } = useAuthStore();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>
            <div className="menu-header">
              <span className="menu-title">StarWiki</span>
              <IonImg src={logo} alt="StarWiki Logo" />
            </div>
          </IonListHeader>
          <IonItem className="user-info" lines="none">
            {isAuthenticated && user ? (
              <>
                <IonAvatar slot="start">
                  <img src={user.avatar_url || "/icon/logo.png"} alt="Avatar" />
                </IonAvatar>
                <IonLabel>
                  <h2>{user.nombre_usuario || user.nombre}</h2>
                  <p className="ion-text-left">{user.email}</p>
                </IonLabel>
              </>
            ) : (
              <IonLabel>
                <h2>Invitado</h2>
                <p className="ion-text-left">Inicia sesión para más opciones</p>
              </IonLabel>
            )}
          </IonItem>
          <div className="menu-actions">
            <LoginButton />
            <br />
            <DarkModeToggle />
          </div>
        </IonList>

        {/* Navegacion Principal */}

        <IonList>
          <IonListHeader>Explorar</IonListHeader>

          {appPages.map((page, index) => (
            <IonMenuToggle key={index} autoHide={false}>
              <IonItem
                className={location.pathname === page.url ? "selected" : ""}
                routerLink={page.url}
                routerDirection="none"
                lines="none"
                detail={false}
              >
                <IonIcon slot="start" ios={page.iosIcon} md={page.mdIcon} />
                <IonLabel>{page.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
        </IonList>

        {/* Página pública */}
        <IonList>
          <IonListHeader>Contenido</IonListHeader>
          {publicPages.map((page, index) => (
            <IonMenuToggle key={index} autoHide={false}>
              <IonItem
                className={location.pathname === page.url ? "selected" : ""}
                routerLink={page.url}
                routerDirection="none"
                lines="none"
                detail={false}
              >
                <IonIcon slot="start" ios={page.iosIcon} md={page.mdIcon} />
                <IonLabel>{page.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
        </IonList>

        {/* Sección de usuario */}
        {isAuthenticated && (
          <IonList>
            <IonListHeader>Usuario</IonListHeader>
            {userPages.map((page, index) => (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={location.pathname === page.url ? "selected" : ""}
                  routerLink={page.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon slot="start" ios={page.iosIcon} md={page.mdIcon} />
                  <IonLabel>{page.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            ))}
          </IonList>
        )}

        {/* Sección del administrador */}
        {isAuthenticated && user?.rol === "ADMIN" && (
          <IonList>
            <IonListHeader>Administración</IonListHeader>
            {adminPages.map((page, index) => (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={location.pathname === page.url ? "selected" : ""}
                  routerLink={page.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon slot="start" ios={page.iosIcon} md={page.mdIcon} />
                  <IonLabel>{page.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
