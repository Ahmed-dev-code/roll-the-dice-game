
import "./App.css"
import Die from "./components/Die"
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import Header from "./components/Header";

const App = () => {

    const [rolls, setRolls] = useState(0);
    const [congrats, setCongrats] = useState("Your score is: ");
    const [noOfConffetti, setNoOfConffetti] = useState(200);
    const [highScore, setHighScore] = useState(
        localStorage.getItem("highScore") || 0
    );
    
    
    // generate an array of objects with random numbers between 1 and 6
    // to hold the dice values and their frozen status
    const generateRandom = () => {
        let newDice = [];
        for (let i = 0; i < 10; i++) {
            const randomNum = Math.floor(Math.random() * 6) + 1;
            const die = { id: i, num: randomNum, isFrozen: false }
            newDice.push(die);
        }
        return (newDice);
    }
    const [dice, setDice] = useState(generateRandom());
    const [endGame, setEndGame] = useState(false);
    
    // update the dice array with new random numbers; 
    // if the dice are frozen, keep the value
    // if the dice are not frozen, update the value
    const rollDice = () => {
        let newDcie = [];
        for (let i = 0; i < 10; i++) {
            if (dice[i].isFrozen) {
                newDcie.push(dice[i]);
            }
            else {
                const randomNum = Math.floor(Math.random() * 6) + 1;
                const die = { id: i, num: randomNum, isFrozen: false }
                newDcie.push(die);
            }
        }
        setDice(newDcie);
        setRolls(rolls + 1);


    }



    const restartGame = () => {
        setDice(generateRandom());
        setEndGame(false);
        setRolls(0);
        setCongrats("Your score is: ");
        setNoOfConffetti(200);
    }

    const handleFreezing = (id) => {
        const newDice = [...dice];
        newDice[id].isFrozen = !newDice[id].isFrozen;
        setDice(newDice);
    }


    // generate the dice to display on the page
    const diceDivs = dice.map((die) => {
        return (
            <Die
                key={die.id}
                className={die.isFrozen ? "frozen-die" : ""}
                num={die.num}
                handleFreezing={() => handleFreezing(die.id)}
            />
        )
    }
    )

    useEffect(() => {
        //test if all dice are frozen and all numbers are the same
        let allFrozen = true;
        let allSame = true;
        let lastNum = dice[0].num;
        for (let i = 0; i < dice.length; i++) {
            if (!dice[i].isFrozen) {
                allFrozen = false;
            }
            if (dice[i].num !== lastNum) {
                allSame = false;
            }
            lastNum = dice[i].num;
        }
        if (allFrozen && allSame) {
            setEndGame(true);
            setTimeout(() => {
                setNoOfConffetti(0);
            }, 3000);
            if (highScore === 0 || rolls < highScore) {
                setHighScore(rolls);
                setCongrats("New high score: ");
                localStorage.setItem("highScore", rolls);
            }

        }
    }, [dice]);


    return (
        <div className="container">
            {endGame ?
                <>
                    <h1>You won!</h1>
                    <p> {congrats + rolls}</p>
                    <Confetti numberOfPieces={noOfConffetti} />
                </>
                :
                <>
                    <Header rolls={rolls} highScore={highScore} />
                </>
            }
            <div className="dice-container">
                {diceDivs}
            </div>
            {
                endGame ?
                    <button onClick={restartGame}>Restart</button>
                    :
                    <button onClick={rollDice}>Roll</button>
            }
        </div>
    );
}

export default App;