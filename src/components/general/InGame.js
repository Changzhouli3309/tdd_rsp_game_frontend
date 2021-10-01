import { useState, useEffect } from "react"
import GameService from "../../service/GameService"

export const InGame = ({ gameId, changeInGame, changeGameList }) => {

    const [roundList, setRoundList] = useState([])
    const [isWinner, setIsWinner] = useState(false)
    const [playerMove, setPlayerMove] = useState("")
    const [game, setGame] = useState(Object)
    const [roundListHook, setRoundListHook] = useState(false)
    const [gameHook, setGameHook] = useState(false)
    const [islaoding, setLaoding] = useState(true);

    useEffect(() => {
        async function getgames() {
            if (gameId > 0) {
                const data = await GameService.getGameById(gameId);
                console.log(data);
                setGame(data);
            }
        }
        getgames();
    }, [gameId, gameHook]);

    useEffect(() => {
        async function getrounds() {
            if (gameId > 0) {
                const data = await GameService.getRounds(gameId);
                console.log(data);
                setRoundList(data);
                setLaoding(false);
            }
        }
        getrounds();
    }, [gameId, roundListHook]);

    const addround = async (playerMove) => {
        const roundReq = { playerMove: playerMove, testString: "new round" };
        await GameService.newRound(gameId, roundReq);
    }

    const checkwin = () => {
        setIsWinner(game.win === game.scoreLimit || game.lose === game.scoreLimit)
    }

    const changeRoundList = () => {
        setRoundListHook(!roundListHook)
    }

    const updateGame = () => {
        setGameHook(!gameHook)
    }

    const getResult = (game) => {
        if (game.win > game.lose) {
            return "You win"
        } else {
            return "You lose"
        }
    }

    const checkAndGo = () => {
        if (playerMove === "ROCK" || playerMove === "PAPER" || playerMove === "SCISSORS") {
            setLaoding(true)
            addround(playerMove)
            updateGame()
            changeRoundList()
            checkwin()
        } else {
            alert("Wrong input! Try again!")
        }

    }

    const goBack = () => {
        changeInGame()
        changeGameList()
    }

    return (
        <> {isWinner ?
            <div className="center">
                <h2>{getResult(game)}</h2>
                <input type="button" value="OK" onClick={goBack} />
            </div>
            :
            <div className="center">
                <h2>choose your move</h2>
                <form className="center">
                    <input list="moves" name="playeMove" onChange={e => setPlayerMove(e.target.value)} />
                    <datalist id="moves">
                        <option value="ROCK" />
                        <option value="PAPER" />
                        <option value="SCISSORS" />
                    </datalist>
                    <input type="button" onClick={checkAndGo} value="check" />
                </form>
            </div>
        }
            {islaoding ?
                <h2>Laoding...</h2>
                :
                roundList.map((r, index) =>
                    <div key={index} className="center">
                        <label>Round: {index + 1}</label>
                        <label>{r.playerMove} vs {r.aiMove}</label>
                        <label>{r.result}</label>
                    </div>)
            }
        </>
    )
}