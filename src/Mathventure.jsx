import { useEffect, useState } from "react"

function Mathventure() {
    const [isStarted, setStarted] = useState(false);
    const [score, setScore] = useState(0);
    const [timeleft, setTimeLeft] = useState(120);

    // Untuk Timer
    useEffect(() => {
        if (isStarted && timeleft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev === 1) {
                        clearInterval((timer));
                        alert("Waktu habis! Skor akhir: " + score);
                        setStarted(false);
                        return 0;
                    }
                    return prev - 1;
                })
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [isStarted, timeleft, score]);

    return (
        <div>
            <Title text={"Mathventure"} />
            <Subtitle text={"Selamat Datang di Mathventure!"} />
            <Description text={"Petualangan seru dunia matematika dimulai di sini. Tantang dirimu menjawab soal-soal berhitung, logika, dan matematika dasar yang dirancang untuk mengasah otak sekaligus menyenangkan. Cocok untuk siapa pun yang ingin melatih kemampuan berhitung secara interaktif. Siapkah kamu menjadi juara Mathventure? Mari mulai petualanganmu sekarang!"} />

            {isStarted ? (
                <MathProblem
                    problem="Berapa hasil dari 5 + 3?"
                    onAnswer={(answer) => {
                        if (answer === "8") {
                            alert("Jawaban benar!");
                            setScore((prev) => prev + 10);
                        } else {
                            alert("Jawaban salah, coba lagi!");
                        }
                    }}
                />
            ) : (
                <StartButton onClick={() => {
                    setStarted(true);
                    setTimeLeft(120);
                    setScore(0);
                }} />
            )}
            <Score score={score} />
            <Timer timeleft={timeleft} />
        </div>
    )
}

function Title({ text }) {
    return (
        <>
            <h1>{text}</h1>
        </>
    )
}

function Subtitle({ text }) {
    return (
        <>
            <h2>{text}</h2>
        </>
    )
}
function Description({ text }) {
    return (
        <>
            <p>{text}</p>
        </>
    )
}

function StartButton({ onClick }) {
    return (
        <>
            <button onClick={onClick}>Mulai Petualangan</button>
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
        <form onSubmit={handleSubmit}>
            <p>{problem}</p>
            <InputAnswer value={answer} onChange={(e) => setAnswer(e.target.value)} />
            <button type="submit">Kirim Jawaban</button>
        </form>
    );
}

function InputAnswer({ value, onChange }) {
    return (
        <>
            <input type="text" value={value} onChange={onChange} placeholder="Masukkan jawabanmu di sini" />
        </>
    )
}

function Score({ score }) {
    return (
        <>
            <h3>Skor: {score}</h3>
        </>
    )
}

function Timer({ timeleft }) {
    return (
        <>
            <h3>Waktu Tersisa: {timeleft}</h3>
        </>
    )
}

export default Mathventure;