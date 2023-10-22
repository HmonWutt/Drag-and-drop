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
    let sortedCardsCopy = [...cards];
    let draggedCard = sortedCards.splice(dragged.current, 1)[0];
    let draggedOverCard = sortedCardsCopy.splice(draggedOver.current, 1)[0];

    if (dragged.current < draggedOver.current) {
      sortedCards.splice(draggedOver.current - 1, 1, draggedCard);
      console.log(sortCards);
      sortedCards.splice(dragged.current, 0, draggedOverCard);
      console.log(sortedCards);
    } else {
      sortedCards.splice(draggedOver.current, 1, draggedCard);
      console.log(sortCards);
      sortedCards.splice(dragged.current, 0, draggedOverCard);
      console.log(sortedCards);
    }
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
              const target = document.getElementById(
                index.toString()
              ) as HTMLElement;
              target.classList.add(styles.hide);
            }}
            onDragEnter={(e) => {
              draggedOver.current = index;
            }}
            onDragOver={(e) => {
              e.preventDefault();

              const target = document.getElementById(
                index.toString()
              ) as HTMLElement;
              target.classList.add(styles.dragover);
            }}
            onDragLeave={(e) => {
              const target = document.getElementById(
                index.toString()
              ) as HTMLElement;
              target.classList.remove(styles.dragover);
            }}
            onDragEnd={(e) => {
              let element = e.currentTarget as HTMLElement;
              element.classList.remove(styles.hide);
            }}
            onDrop={(e) => {
              const target = e.target as HTMLElement;
              target.classList.remove(styles.dragover);
              console.log(
                "targetid",
                target.id,
                "draggedover",
                draggedOver.current,
                "dragged",
                dragged.current
              );
              if (draggedOver.current === dragged.current) {
              } else {
                sortCards(e, index);
              }
            }}
          >
            {card.id}
          </div>
        ))}
      </div>
    </>
  );
}
