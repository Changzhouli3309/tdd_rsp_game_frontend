import { useState } from "react"
import GameService from "../../service/GameService";

export const SetGame = ({ setGameId, changeInGame, gameList }) => {

    const [scoreLimit, setScoreLimit] = useState(Number);

    const addGame = async (scoreLimit) => {
        const gameReq = { scoreLimit: scoreLimit, testString: "new game" };
        const data = await GameService.newGame(gameReq);
        console.log(data.id)
        setGameId(data.id);
    }

    const checkAndStart = () => {
        if (scoreLimit > 0) {
            addGame(scoreLimit);   
            changeInGame();
        } else {
            alert("Wrong input! Try again!")
        }
    }

    const getResult = (game) => {
        if (game.win > game.lose) {
            return "You win"
        } else {
            return "You lose"
        }
    }

    return (<>
        <h3 className="center">Set Score Limit</h3>
        <form className="center">
            <input type="number" name="scoreLimit" min="1" onChange={e => setScoreLimit(Number.parseInt(e.target.value))} />
            <input type="button" onClick={checkAndStart} value="Set" />
        </form>
        {gameList.map((g, index) =>
            <div key={index} className="center">
                <label>Game: {index+1}</label>
                <label>Win: {g.win}</label>
                <label>Lose: {g.lose}</label>
                <label>{getResult(g)}</label>
            </div>)}
    </>)
}