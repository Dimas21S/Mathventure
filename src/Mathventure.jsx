import { useState, useEffect } from "react";
import Score from "./Score";
import AlertComponent from "./Alert";
import './App.css'

function Mathventure() {
    const [isStarted, setStarted] = useState(false);
    const [isGameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [timeleft, setTimeLeft] = useState(120);
    const [alertState, setAlertState] = useState({
        message: "",
        variant: "",
        show: false
    });
    const [currentProblem, setCurrentProblem] = useState(generateProblem());

    function generateProblem() {
        const num1 = Math.floor(Math.random() * 10) + 1; // +1 untuk hindari 0
        let num2 = Math.floor(Math.random() * 10) + 1;
        const operations = ['+', '-', 'x', '/'];
        const op = operations[Math.floor(Math.random() * operations.length)];

        let answer;
        switch (op) {
            case '+':
                answer = num1 + num2;
                break;
            case '-':
                answer = num1 - num2;
                break;
            case 'x':
                answer = num1 * num2;
                break;
            case '/':
                // Pastikan tidak pembagian dengan 0 dan hasilnya bulat
                answer = Math.round((num1 / num2) * 100) / 100; // 2 angka desimal
                break;
            default:
                answer = 0;
        }

        return {
            question: ` Berapa hasil dari ${num1} ${op === '/' ? '÷' : op} ${num2} ?`,
            answer: answer.toString()
        };
    }

    useEffect(() => {
        if (isStarted && timeleft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setGameOver(true);
                        setStarted(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [isStarted, timeleft]); // Hapus alertState dari dependencies

    useEffect(() => {
        if (alertState.show) {
            const timer = setTimeout(() => {
                setAlertState(prev => ({ ...prev, show: false }));
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [alertState.show]);

    const handleAnswer = (answer) => {
        if (answer === currentProblem.answer) {
            setScore((prev) => prev + 10);
            setCurrentProblem(generateProblem());
            setAlertState({
                message: "Jawaban Benar! +10 poin",
                variant: "success",
                show: true
            });
        } else {
            setAlertState({
                message: "Jawaban Salah! Coba lagi",
                variant: "danger",
                show: true
            });
        }
    };

    const restartGame = () => {
        setStarted(true);
        setGameOver(false);
        setTimeLeft(120);
        setScore(0);
        setCurrentProblem(generateProblem());
        setAlertState({ message: "", variant: "", show: false });
    };

    return (
        <div className="cozy-mathventure">
            <div className="cozy-container">
                <Title text="Mathventure" />

                {isStarted ? (
                    <div className="cozy-game-screen">
                        <div className="cozy-game-header">
                            <Score score={score} />
                            <Timer timeleft={timeleft} />
                        </div>

                        <MathProblem
                            problem={currentProblem.question}
                            onAnswer={handleAnswer}
                        />

                        {alertState.show && (
                            <AlertComponent
                                message={alertState.message}
                                variant={alertState.variant}
                            />
                        )}
                    </div>
                ) : isGameOver ? (
                    <div className="cozy-game-over">
                        <GameOver text={`Great job! Your final score: ${score}`} />
                        <button
                            onClick={restartGame}
                            className="cozy-button"
                        >
                            Play Again
                        </button>
                    </div>
                ) : (
                    <div className="cozy-welcome">
                        <Subtitle text="Welcome to Mathventure!" />
                        <Description text="A cozy math adventure awaits..." />
                        <StartButton onClick={restartGame} />
                    </div>
                )}
            </div>
        </div>
    );
}



function Title({ text }) {
    return (
        <>
            <h1 id="title">{text}</h1>
        </>
    )
}

function Subtitle({ text }) {
    return (
        <>
            <h2 id="subtitle">{text}</h2>
        </>
    )
}
function Description({ text }) {
    return (
        <>
            <p id="description">{text}</p>
        </>
    )
}

function StartButton({ onClick }) {
    return (
        <>
            <button id="start-button" onClick={onClick}>Mulai Petualangan</button>
        </>
    )
}

function MathProblem({ problem, onAnswer }) {
    const [answer, setAnswer] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onAnswer(answer);
        setAnswer("");
    };

    return (
        <form onSubmit={handleSubmit} id="math-problem-form">
            <p style={{ fontSize: "1.5em", fontWeight: "bold" }}>{problem}</p>
            <InputAnswer value={answer} onChange={(e) => setAnswer(e.target.value)} />
            <button type="submit" id="math-problem-submit">Kirim Jawaban</button>
        </form>
    );
}

function InputAnswer({ value, onChange }) {
    return (
        <>
            <input id="math-problem-input" type="text" value={value} onChange={onChange} placeholder="Masukkan jawabanmu di sini" />
        </>
    )
}

function Timer({ timeleft }) {
    return (
        <>
            <h3 style={{ fontSize: "1.2em", fontWeight: "bold" }}>Waktu Tersisa: {timeleft}</h3>
        </>
    )
}

export default Mathventure;