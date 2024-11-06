"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export default function ConnectionGame({
    goodWords,
    allWords,
}: {
    goodWords: string[];
    allWords: string[];
}) {
    const [clickedWords, setClickedWords] = useState<string[]>([]);
    const [score, setScore] = useState<number>(0);
    const [initialized, setInitialized] = useState<boolean>(false);
    const [shuffledWords, setShuffledWords] = useState<string[]>(allWords);
    const shuffle = (array: string[]) => {
        let currentIndex = array.length,
            randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex],
            ];
        }
        return array;
    };
    const handleClick = (word: string) => {
        if (goodWords.includes(word)) {
            setScore(score + 1);
        }
        window.localStorage.setItem(
            "clickedWords-playId",
            JSON.stringify([...new Set([...clickedWords, word])]),
        );
        setClickedWords([...clickedWords, word]);
    };
    useEffect(() => {
        const shuffleIndex = Math.floor(Math.random() * allWords.length);
        if (window.localStorage.getItem("clickedWords-playId")) {
            const saved = JSON.parse(
                window.localStorage.getItem("clickedWords-playId") as string,
            ) as string[];
            setClickedWords(saved);
            setScore(saved.filter((word) => goodWords.includes(word)).length);
        }
        setShuffledWords([
            ...shuffle([
                ...shuffle(
                    allWords.filter((word) => !goodWords.includes(word)),
                ).slice(0, 10 - Math.min(5, goodWords.length)),
                ...shuffle(goodWords).slice(0, Math.min(5, goodWords.length)),
            ]),
        ]);
        setInitialized(true);
    }, [allWords, goodWords]);
    if (!initialized) {
        return <p>Shuffling your options...</p>;
    }
    return (
        <section className="">
            <h1>{}</h1>
            <p>Score: {score}</p>
            <div className="grid w-full max-w-screen-lg grid-cols-2 place-content-center gap-4">
                {shuffledWords.map((word, index) => (
                    <Button
                        disabled={clickedWords.includes(word)}
                        key={index}
                        variant={
                            clickedWords.includes(word)
                                ? goodWords.includes(word)
                                    ? "correct"
                                    : "wrong"
                                : "outline"
                        }
                        onClick={() => handleClick(word)}
                    >
                        {word}
                    </Button>
                ))}
            </div>
        </section>
    );
}
