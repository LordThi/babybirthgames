'use client'

import Image from "next/image";
import styles from "./page.module.scss";
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
    <main>
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
            <button className={styles.submit_form_button}>Tenter ma chance</button>
          </div>
          
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
      </div>
      
    </main>
  );
}
