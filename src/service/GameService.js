const GameService = {
    getGames: async () => {
        try {
            const res = await fetch('http://localhost:8080/api/games');
            if (res.status !== 401) {
                const data = await res.json();
                return data;
            } else {
                return {
                    message: { msgBody: "Unauthorized to get games", msgError: true },
                }
            }
        } catch (error) {
            return { error: error };
        }
    },
    newGame: async (gameReq) => {
        try {
            const res = await fetch("http://localhost:8080/api/game", {
                method: "post",
                body: JSON.stringify(gameReq),
                headers: {
                    "Content-type": "application/json",
                },
            });
            if (res.status !== 401) {
                const data = await res.json();
                return data;
            } else {
                return {
                    message: { msgBody: "Unauthorized to add game", msgError: true },
                };
            }
        } catch (error) {
            return { error: error };
        }
    },
    getGameById: async (id) => {
        try {
            const res = await fetch('http://localhost:8080/api/game/' + id);
            if (res.status !== 401) {
                const data = await res.json();
                return data;
            } else {
                return {
                    message: { msgBody: "Unauthorized to get games", msgError: true },
                }
            }
        } catch (error) {
            return { error: error };
        }
    },
    getRounds: async () => {
        try {
            const res = await fetch('http://localhost:8080/api/game/${id}/rounds');
            if (res.status !== 401) {
                const data = await res.json();
                return data;
            } else {
                return {
                    message: { msgBody: "Unauthorized to get games", msgError: true },
                }
            }
        } catch (error) {
            return { error: error };
        }
    },
    newRound: async (id, roundReq) => {
        try {
            const res = await fetch("http://localhost:8080/api/game/" + id + "/round", {
                method: "post",
                body: JSON.stringify(roundReq),
                headers: {
                    "Content-type": "application/json",
                },
            });
            if (res.status !== 401) {
                const data = await res.json();
                return data;
            } else {
                return {
                    message: { msgBody: "Unauthorized to add game", msgError: true },
                };
            }
        } catch (error) {
            return { error: error };
        }
    },
};
export default GameService;