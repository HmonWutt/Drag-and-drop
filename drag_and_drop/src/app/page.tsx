"use client";
import Image from "next/image";
import { ReactSortable } from "react-sortablejs";
import styles from "./page.module.css";
import { useState, useRef, useEffect } from "react";
import { color } from "chart.js/helpers";

export default function Home() {
  class Card {
    number: number;
    color: string;

    constructor(number: number, color: string) {
      this.number = number;
      this.color = color;
    }

    showcard() {
      return (
        "Hello, card number is" +
        this.number +
        " and" +
        "card color is" +
        this.color
      );
    }
  }
  const oneRed = new Card(1, "red");
  const twoYellow = new Card(2, "yellow");
  const threeGreen = new Card(3, "green");
  const fourBlue = new Card(4, "blue");
  const [cards, setCards] = useState([
    { id: oneRed.number, name: oneRed.color },
    { id: twoYellow.number, name: twoYellow.color },
    { id: threeGreen.number, name: threeGreen.color },
    { id: fourBlue.number, name: fourBlue.color },
  ]);
  const dragged = useRef<any>(null);
  const draggedOver = useRef<any>(null);
  interface ItemType {
    id: number;
    name: string;
  }
  const sortCards = (e: any, index: number) => {
    let sortedCards = [...cards];
    let draggedCard = sortedCards.splice(dragged.current, 1)[0];
    console.log(dragged.current, draggedOver.current);

    let draggedOverCard = sortedCards.splice(
      draggedOver.current,
      0,
      draggedCard
    );
    dragged.current = null;
    draggedOver.current = null;
    setCards(sortedCards);
  };

  return (
    <>
      <div className={styles.grid}>
        {cards.map((card, index) => (
          <div
            key={index}
            id={index.toString()}
            style={{ backgroundColor: card.name }}
            className={styles.card}
            draggable
            onDragStart={(e) => {
              dragged.current = index;
            }}
            onDragEnter={(e) => {
              draggedOver.current = index;

              const target = document.getElementById(
                index.toString()
              ) as HTMLElement;
              target.classList.add(styles.dragover);
            }}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDragLeave={(e) => {
              const target = document.getElementById(
                index.toString()
              ) as HTMLElement;
              target.classList.remove(styles.dragover);
            }}
            onDragEnd={(e) => {
              sortCards(e, index);
            }}
            onDrop={(e) => {
              e.preventDefault();

              const target2 = e.target as HTMLElement;
              target2.classList.remove(styles.dragover);
            }}
          >
            {card.id}
          </div>
        ))}
      </div>
    </>
  );
}
