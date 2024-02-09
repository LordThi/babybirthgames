'use client'

import Image from "next/image";
import styles from "./page.module.scss";
import { useState } from "react";

export default function Home() {

  const [input, setInput ] = useState("");
  const [nameGuessed, setNameGuessed] = useState(null)
  const [isSubmitted, setIsSubmitted ] = useState(false)
  const [count, setCount] = useState(0)
  const [compareResult, setCompareResult] = useState(null)
  const [correctLetters, setCorrectLetters] = useState(null)
  const [wrongLetters, setWrongLetters] = useState(null)
  const [incorrectLetters, setIncorrectLetters] = useState(null)

  const babyName = "Cassandre".toLowerCase() // toLowerCase for futur purpose (ex. other parents entry)

  const handleChange = (event) => {
    const userEntry = event.target.value
    setInput(userEntry.toLowerCase())
  }

  const submitForm = (event) => {
    event.preventDefault()
    setIsSubmitted(true)
    setNameGuessed(input)
    setCount(count+1)
    correctLettersCount(babyName, input)
  }

  const resultBubble = () => {
    return (
      <>
      <p>Pour le prénom {nameGuessed},
      {correctLetters.length === 0 ?
      "aucune lettre ne correspond, pas de chance"
        : correctLetters.length === 1 ?
          "la lettre bien placée est : " 
          : "les lettres bien placées sont : "
      }
        {correctLetters.length}</p>
        <p>
          {correctLetters && correctLetters.map((letter, index) => (
            <span key={index}>
              {letter}
              {index === correctLetters.length - 2 ? ' et ' : 
              index < correctLetters.length - 1 ? ', ' : ''}
          </span>
          ))}
        </p>
      </>
    )
  }

  const emojiFeedback = () => {
    if (count > 4) {
      return <p>🙄</p>
    }
    switch (count) {
      case 1 :
        return <p>😄</p>
      case 2 :
        return <p>🙂</p>
      case 3 :
        return <p>😐</p>
      case 4 :
        return <p>🫤</p>
      default:
        return <p>😃</p>
    }
  }

  //idealement distance de Levenshtein

  // const correctLettersCount = (babyName, nameGuessed) => {
  //   const lengthToCompare = Math.min(babyName.length, nameGuessed.length);
  //   let correctLettersCount = 0

  //   for (let i = 0; i < lengthToCompare; i++) {
  //     if (babyName[i] === nameGuessed[i]) {
  //       correctLettersCount++
  //     }
  //   }

  //   return correctLettersCount
  // }

  const correctLettersCount = (babyName, nameGuessed) => {
    let resultat = []
    let correctLetters = []
    let wrongLetters = []
    let incorrectLetters = []
  
    for (let i = 0; i < nameGuessed.length; i++) {
      if (babyName[i] === nameGuessed[i]) {
        resultat.push({ id: [i], lettre: nameGuessed[i], etat: "correct" })
        correctLetters.push(nameGuessed[i])
      } else if (babyName.includes(nameGuessed[i])) {
        resultat.push({ id: [i], lettre: nameGuessed[i], etat: "wrongPlace" })
        wrongLetters.push(nameGuessed[i])
      } else {
        resultat.push({ id: [i], lettre: nameGuessed[i], etat: "incorrect" })
        incorrectLetters.push(nameGuessed[i])
      }
    }
  
    setCompareResult(resultat)
    setCorrectLetters(correctLetters)
    setWrongLetters(wrongLetters)
    setIncorrectLetters(incorrectLetters)
    // return resultat
  }

  return (
    <main className={styles.main_container}>
      <div className={styles.input_background_image}>
        {/* <Image
          src="/images/tache_pink.png"
          className={styles.input_background}
          width={1366}
          height={768}
          alt="pink colored round shape"
        /> */}
        <h1>Qui suis-je ?</h1>
        <p className={styles.guess_description}>Sauras-tu trouver le prénom de #2 ?</p>
        <form onSubmit={submitForm}>
          <div className={styles.input_container}>
            <input className={styles.name_input} type="text" name="input" onChange={handleChange}/>
            <button className={styles.submit_form_button}>
              {
                count < 1 ?
              "Tenter ma chance"
            : "Retenter ma chance"}
              </button>
          </div>
          
          {
            isSubmitted ?
            <>
              <p>
                L input dit :&nbsp;
                {nameGuessed}
              </p>
              <p>
                {
                  compareResult.map((letter) =>
                  <span key={letter.id}>{letter.lettre} est {letter.etat}, </span>
                  )
                }
              </p>
                
                <p>Nombre d&apos;essais: {count}</p>
                {/* {console.log(typeof correctLettersCount(babyName, nameGuessed))} */}
            </>
            : null
          }
        </form>
      </div>
      <div className={styles.feedback}>
        { count > 0 ?
        resultBubble() : null}
        {emojiFeedback()}
      </div>
    </main>
  );
}
