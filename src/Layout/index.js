import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./common/Header";
import Home from "./common/Home";
import NewDeck from "./decks/CreateDeck";
import EditDeck from "./decks/EditDeck";
import StudyDeck from "./decks/StudyDeck";
import Deck from "./decks/Deck"
import EditCard from "./Cards/EditCard";
import NewCard from "./Cards/CreateCard";
import StudyCard from "./decks/StudyCard";
import NotFound from "./NotFound";
import { listDecks } from "../utils/api/index";

function Layout() {

  const [decks, setDecks] = useState([]);

  //load decks
  useEffect(() => {
    //declare abort Controller
    setDecks([]);
    const abortController = new AbortController();
    //loading of decks from API
    async function loadDecks() {
      try {
        const loadedDecks = await listDecks();
        setDecks(loadedDecks);
      } catch (error) {
        if (error.name !== "AbortError") {
          throw error;
        }
      }
    }
    loadDecks();
    return() => abortController.abort();
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home decks={decks}/>
          </Route>
          <Route path={"/decks/new"}>
            <NewDeck />
          </Route>
          <Route path={"/decks/:deckId/cards/:cardId/edit"}>
            <EditCard />
          </Route>
          <Route path={"/decks/:deckId/cards/:cardId/study"}>
            <StudyCard/>
          </Route>
          <Route path={"/decks/:deckId/cards/new"}>
            <NewCard />
          </Route>
          <Route path={"/decks/:deckId/edit"}>
            <EditDeck />
          </Route>
          <Route path={"/decks/:deckId/study"}>
            <StudyDeck />
          </Route>
          <Route exact path={"/decks/:deckId"}>
            <Deck />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
