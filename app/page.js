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
  const [extraLetters, setExtraLetters] = useState (null)

  const babyName = "Olympe".toLowerCase() // toLowerCase for futur purpose (ex. other parents entry)

  const handleChange = (event) => {
    const userEntry = event.target.value
    setInput(userEntry.toLowerCase())
    console.log(userEntry)
  }

  const submitForm = (event) => {
    event.preventDefault()
    setIsSubmitted(true)
    setNameGuessed(input.charAt(0).toUpperCase()+input.slice(1)) // Capitalize first letter
    setCount(count+1)
    correctLettersCount(babyName, input)
  }

  const resultBubble = () => {
    return (
      <>
      <p>Pour le prénom <strong>{nameGuessed}</strong>,&nbsp;
      {correctLetters.length === 0 ?
      wrongLetters.length > 0 ?
      "certaines lettres correspondent mais ne sont pas à la bonne place."
      :"aucune lettre ne correspond, pas de chance..."
        : correctLetters.length === 1 ?
          "la seule lettre bien placée est : " 
          : "les lettres bien placées sont : "
      }
          {correctLetters && correctLetters.map((letter, index) => (
            <span key={index}>
              {letter}
              {index === correctLetters.length - 2 ? ' et ' : 
              index < correctLetters.length - 1 ? ', ' : '.'}
          </span>
          ))}
        </p>
        {wrongLetters && wrongLetters.length > 0 ? <>
          <p>Il faudrait essayer de replacer&nbsp;
          {wrongLetters && wrongLetters.map((letter, index) => (
            <span key={index}>
              {letter}
              {index === wrongLetters.length - 2 ? ' et ' : 
              index < wrongLetters.length - 1 ? ', ' : '.'}
          </span> 
          ))}
        </p></>: null}
        {
          extraLetters && extraLetters.length > 0 ? <>
          <p>Par contre, il y a&nbsp;
          {extraLetters.length === 1 ?
          "un" : "des"}&nbsp;
          {extraLetters && extraLetters.map((letter, index) => (
            <span key={index}>
              {letter}
              {index === extraLetters.length - 2 ? ' et ' : 
              index < extraLetters.length - 1 ? ', ' : ' '}
          </span> 
          ))}
          en trop.</p></> : null
        }
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
    let resultat = [];
    let correctLetters = [];
    let wrongLetters = [];
    let incorrectLetters = [];
    let tempExtraLetters = []; // Utiliser un tableau temporaire pour les lettres en trop
    let letterCount = {};
  
    // Compter les occurrences de chaque lettre dans babyName
    for (let letter of babyName) {
      letterCount[letter] = (letterCount[letter] || 0) + 1;
    }
  
    for (let i = 0; i < nameGuessed.length; i++) {
      if (babyName[i] === nameGuessed[i]) {
        resultat.push({ id: i, lettre: nameGuessed[i], etat: "correct" });
        correctLetters.push(nameGuessed[i].toUpperCase());
        letterCount[nameGuessed[i]]--; // Décrémenter le compteur pour cette lettre
      } else if (babyName.includes(nameGuessed[i])) {
        if (letterCount[nameGuessed[i]] > 0) {
          resultat.push({ id: i, lettre: nameGuessed[i], etat: "wrongPlace" });
          wrongLetters.push(nameGuessed[i].toUpperCase());
          letterCount[nameGuessed[i]]--; // Décrémenter le compteur pour cette lettre
        } else {
          // Si la lettre est présente dans babyName mais que le compteur est à 0, elle est en trop
          tempExtraLetters.push(nameGuessed[i].toUpperCase());
        }
      } else {
        resultat.push({ id: i, lettre: nameGuessed[i], etat: "incorrect" });
        incorrectLetters.push(nameGuessed[i].toUpperCase());
      }
    }
  
    setCompareResult(resultat);
    setCorrectLetters(correctLetters);
    setWrongLetters(wrongLetters);
    setIncorrectLetters(incorrectLetters);
    setExtraLetters(tempExtraLetters);
  }


  return (
  <>
    <header style={{textAlign:"center"}}>
      <h1>Qui suis-je ?</h1>
    </header>
    <main className={styles.main_container}>
      <div className={styles.input_background_image}>
        {/* <Image
          src="/images/tache_pink.png"
          className={styles.input_background}
          width={1366}
          height={768}
          alt="pink colored round shape"
        /> */}
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

                <p>Nombre d&apos;essais: {count}</p>
                {/* {console.log(typeof correctLettersCount(babyName, nameGuessed))} */}
            </>
            : null
          }
        </form>
      </div>
      <div className={styles.result_container}>
        <div className={styles.resultBubble_text_illustration}>
          { count > 0 ?
        resultBubble() : null}
        </div>
      
        <div className={styles.feedback}>
          {emojiFeedback()}
        </div>
      </div>
    </main>
    </>
  );
}
