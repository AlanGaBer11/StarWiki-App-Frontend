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
  IonNote,
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

const labels = [
  {
    title: "Posts",
    link: "/posts",
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
          <IonItem lines="none" className="ion-no-padding ion-margin-bottom">
            {isAuthenticated && user ? (
              <>
                <IonLabel>
                  <h2>{user.nombre_usuario || user.nombre}</h2>
                  <p className="ion-text-left">{user.email}</p>
                </IonLabel>
                <IonImg
                  src={user.avatar_url}
                  alt="Avatar"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    marginLeft: "8px",
                  }}
                />
              </>
            ) : (
              <IonLabel>
                <h2>Invitado</h2>
                <p className="ion-text-left">Inicia sesión para más opciones</p>
              </IonLabel>
            )}
          </IonItem>
          <LoginButton />
          <DarkModeToggle />

          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    aria-hidden="true"
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index} routerLink={label.title}>
              <IonIcon aria-hidden="true" slot="start" icon={bookmarkOutline} />
              <IonLabel>{label.title}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
