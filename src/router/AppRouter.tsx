import { IonReactRouter } from "@ionic/react-router";
import { IonRouterOutlet } from "@ionic/react";
import { Route, Redirect } from "react-router";
import Menu from "../components/menu/Menu";

/* Páginas */
import HomePage from "../pages/home/HomePage";

/* Star Wars */
import StarWarsPage from "../pages/star-wars/StarWarsPage";
import TrilogiaPrecuelasPage from "../pages/star-wars/TrilogiaPrecuelasPage";
import TrilogiaOriginalPage from "../pages/star-wars/TrilogiaOriginalPage";
import TrilogiaSecuelasPage from "../pages/star-wars/TrilogiaSecuelasPage";

/* Videojuegos */
import VideoGamesPage from "../pages/videogames/VideoGamesPage";
import XboxPage from "../pages/videogames/XboxPage";
import PlayStationPage from "../pages/videogames/PlayStationPage";
import NintendoPage from "../pages/videogames/NintendoPage";

/* Anime */
import AnimePage from "../pages/anime/AnimePage";
import PokemonPage from "../pages/anime/PokemonPage";
import DemonSlayerPage from "../pages/anime/DemonSlayerPage";
import DragonBallPage from "../pages/anime/DragonBallPage";
import NarutoPage from "../pages/anime/NarutoPage";
import AttackOnTitanPage from "../pages/anime/AttackOnTitanPage";
import OnePiecePage from "../pages/anime/OnePiece";

/* Auth */
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

/* Posts */
import PostsPage from "../pages/posts/PostsPage";
import PostPage from "../pages/posts/PostPage";

/* Errors */
import NotFoundPage from "../pages/error/NotFoundPage";
import UnauthorizedPage from "../pages/error/UnauthorizedPage";
import BuildPage from "../pages/error/BuildPage";

/* Protección */
import ProtectedRoute from "./ProtectedRoutes";

const AppRouter: React.FC = () => {
  return (
    <IonReactRouter>
      <Menu />

      <IonRouterOutlet id="main">
        {/* Rutas principales */}
        <Route path="/" exact>
          <Redirect to="/inicio" />
        </Route>

        <Route path="/inicio" exact>
          <HomePage />
        </Route>

        {/* STAR WARS */}
        <Route path="/star-wars" exact>
          <StarWarsPage />
        </Route>
        <Route path="/star-wars/trilogia-precuelas" exact>
          <TrilogiaPrecuelasPage />
        </Route>
        <Route path="/star-wars/trilogia-original" exact>
          <TrilogiaOriginalPage />
        </Route>
        <Route path="/star-wars/trilogia-secuelas" exact>
          <TrilogiaSecuelasPage />
        </Route>

        {/* Tabs */}
        <Route path="/star-wars/trilogia-precuelas/:tab" exact>
          <TrilogiaPrecuelasPage />
        </Route>
        <Route path="/star-wars/trilogia-original/:tab" exact>
          <TrilogiaOriginalPage />
        </Route>
        <Route path="/star-wars/trilogia-secuelas/:tab" exact>
          <TrilogiaSecuelasPage />
        </Route>

        {/* VIDEOJUEGOS */}
        <Route path="/videojuegos" exact>
          <VideoGamesPage />
        </Route>
        <Route path="/videojuegos/xbox" exact>
          <XboxPage />
        </Route>
        <Route path="/videojuegos/playstation" exact>
          <PlayStationPage />
        </Route>
        <Route path="/videojuegos/nintendo" exact>
          <NintendoPage />
        </Route>

        {/* ANIME */}
        <Route path="/anime" exact>
          <AnimePage />
        </Route>
        <Route path="/anime/pokemon" exact>
          <PokemonPage />
        </Route>
        <Route path="/anime/demon-slayer" exact>
          <DemonSlayerPage />
        </Route>
        <Route path="/anime/dragon-ball" exact>
          <DragonBallPage />
        </Route>
        <Route path="/anime/naruto" exact>
          <NarutoPage />
        </Route>
        <Route path="/anime/attack-on-titan" exact>
          <AttackOnTitanPage />
        </Route>
        <Route path="/anime/one-piece" exact>
          <OnePiecePage />
        </Route>

        {/* AUTH */}
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>

        {/* POSTS */}
        <Route path="/posts" exact>
          <PostsPage />
        </Route>
        <Route path="/posts/:nombre_categoria" exact>
          <PostsPage />
        </Route>
        <Route path="/post/:nombre_categoria/:titulo_post" exact>
          <PostPage />
        </Route>

        {/* Rutas en construcción */}
        <Route path="/perfil">
          <BuildPage />
        </Route>
        <Route path="/admin">
          <BuildPage />
        </Route>

        {/* 404 - Ruta no encontrada */}
        <Route render={() => <NotFoundPage />} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default AppRouter;
