import { useState,useEffect } from "react"
import { SetGame } from "../general/SetGame"
import GameService from "../../service/GameService";
import { InGame } from "../general/InGame";

export const HomePage = () => {

    const [gameId, setGameId] = useState(Number);
    const [gameList, setGameList] = useState(Array);
    const [isInGame, setIsInGame] = useState(false);
    const [gameListHook, setGameListHook] = useState(false)

    useEffect (() => {
        async function getgames(){        
            const data = await GameService.getGames();
            console.log(data);
            setGameList(data);            
        }
        getgames();
    },[gameListHook]);

    const changeInGame = () =>{
        setIsInGame(!isInGame)
    }

    const changeGameList = () =>{
        setGameListHook(!gameListHook)
    }

    return (<>
        <h1 className="center">ROCK PAPER SCISSORS</h1>
        {
            isInGame ?
                <InGame gameId={gameId} changeInGame={changeInGame} changeGameList={changeGameList}/> :
                <SetGame setGameId={setGameId} changeInGame={changeInGame} gameList={gameList}/>
        }
    </>
    )
}