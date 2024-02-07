'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {

  const [input, setInput ] = useState("");
  const [nameGuessed, setNameGuessed] = useState(null)
  const [isSubmitted, setIsSubmitted ] = useState(false);
  const [count, setCount] = useState(0)

  const babyName = "Oui"

  const handleChange = (event) => {
    setInput(event.target.value);
  }

  const submitForm = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    setNameGuessed(input);
    setCount(count+1);
  }
  return (
    <main className={styles.main}>
      <h1>Guess my name</h1>
        <form onSubmit={submitForm}>
          <input type="text" name="input" onChange={handleChange}/>
          <button>Ok</button>
          {
            isSubmitted ?
            <>
              <p>
                L'input dit :&nbsp;
                {nameGuessed}
              </p>
              <p>
                {
                  nameGuessed === babyName ? "Yes papa" : "C'est un prank?"
                }
              </p>
                
                <p>Nombre d&apos;essais: {count}</p>
            </>
            : null
          }
        </form>
    </main>
  );
}
