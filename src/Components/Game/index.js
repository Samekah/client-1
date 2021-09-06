import React, { useRef, useEffect, useState } from 'react';
// import { QuestionModal } from '../../Components';
import { Character, Obstacle, Scoreboard } from '../../GameComponents';
import { shuffle } from '../../Helpers';
import './style.css';

let gameInProgress = true;
let scoreMultiplier = 1;

const Game = () => {

    const [questions, setQuestions] = useState([])
    const speed = 20;
    const canvasRef = useRef(null); 
    const questionDelay = 1000;
    const modalRef = useRef(null);

    useEffect(() => {
        let mockQuestions = [
            {question: "What is my name?", incorrect_answers: [ "Romeo", "Beth", "Sergi"], correct_answer: "Zak"},
            {question: "What is root 4?", incorrect_answers: [ "23", "9", "1"], correct_answer: "2"},
            {question: "What is root 4?", incorrect_answers: [ "23", "9", "1"], correct_answer: "2"},
            {question: "What is the name of our lecturer?", incorrect_answers: ["Romeo", "Zak", "Sergi"], correct_answer: "Beth"},
        ] 
        setQuestions(mockQuestions)
    }, [])


    useEffect(() => {
        const canvas = canvasRef.current; 
        const context = canvas.getContext('2d');
        const character = new Character(context, canvas);
        const obstacle = new Obstacle(context, canvas);
        const scoreboard = new Scoreboard(context, canvas);

        window.addEventListener("keydown", (e) =>  {
            const direction = e.code.replace('Arrow', '');
            character.verticalMovement(direction);
        })

        character.sprite_image.src = "../../GameComponents/Character/sprites/test_walk.png"

        window.setInterval(() => {

            if (gameInProgress){
                context.clearRect(0, 0, canvas.width, canvas.height);
                character.display();
                character.update();
                obstacle.display();
                obstacle.update();
                scoreboard.display();
                scoreboard.update(scoreMultiplier);

                character.anim.update_frame();
   
                if(((obstacle.x + obstacle.width > character.x && obstacle.x + obstacle.width < character.x + character.width) ||
                    (obstacle.x > character.x && obstacle.x < character.x + character.width))
                && (character.y <= canvas.height - (character.height)) && (character.y > canvas.height - (character.height + obstacle.height))){
                    console.log('colision!')
                    if (scoreboard.score > 100){
                        scoreboard.score -= 100;
                    } else {
                        scoreboard.score = 0;
                    }
                }
            }

            

        }, 1000/speed);
        
        window.setTimeout(() => {
            toggleGameState()
        }, questionDelay);

    }, [])

    const resetTimeout = () => {
        if (gameInProgress){
            window.setTimeout(() => {
                toggleGameState()
            }, questionDelay)
        }
    }

    const toggleModal = () => {
        if (modalRef.current.style.display !== "block"){
            modalRef.current.style.display = "block"
            // canvasRef.current.style.display = "none"
        } else {
            modalRef.current.style.display = "none"
            // canvasRef.current.style.display = "block"
        }
    }

    const toggleGameState = () => {
        if (gameInProgress){
            gameInProgress = false;
        } else {
            gameInProgress = true;
        }
        toggleModal()
        resetTimeout()

    }

    const removeQuestion = () => {
        setQuestions((prevQuestions) => {
            let newQuestions = prevQuestions.slice(1)
            return newQuestions;
        })
    }

    const questionCorrect = () => {
        scoreMultiplier += 0.1;
    }

    const questionIncorrect = () => {
        if (scoreMultiplier > 1){
            scoreMultiplier -= 0.1;
        }
    }

    const renderButtons = () => {
        let allAnswers = questions[0].incorrect_answers;
        allAnswers.push(questions[0].correct_answer);
        shuffle(allAnswers);
        return allAnswers.map((a, i) => {
            return (
                <button key={i} onClick={() => {
                    if (a === questions[0].correct_answer){
                        questionCorrect();
                    } else {
                        questionIncorrect();
                    }
                    toggleGameState()
                    removeQuestion()
                }}>{a}</button>
            )
        })
    }


    const renderCurrentQuestion = () => {
        if (questions[0]){
            return (
                <section>
                    <h1>{questions[0].question}</h1>
                    {renderButtons()}
                </section>
            )
        } else {
            return <h1>Game is over</h1>
        }
    }

    const renderForm = () => {
        return (
            <>
                <h1>Question Modal</h1>
                {renderCurrentQuestion()}
            </>
        )
    }

    return ( 
        <div>
            <canvas ref={canvasRef}></canvas>
            <div id="modal" ref={modalRef}>
                {renderForm()}
            </div>
        </div> 
    );
}
 
export default Game;