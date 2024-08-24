import DrinkCard from "../DrinkCard/DrinkCard";
import DrinkCarouselProps from "./DrinkCarouselProps";
import "./DrinkCarousel.css";
import { useEffect, useState } from "react";

export default function DrinkCarousel({ drinks }: DrinkCarouselProps) {
    //Pointer to current drink in the drinks list.
    let [currentDrinkIndex, setCurrentDrinkIndex] = useState<number | null>(null);

    //Reset the pointer to the drinks list if possible, otherwise it is null.
    useEffect(() => {
        if (drinks != null && drinks.length != 0) {
            setCurrentDrinkIndex(0);
        } else {
            setCurrentDrinkIndex(null);
        }
    }, [drinks]);

    //Set a blurry background of drink.
    useEffect(() => {
        if (currentDrinkIndex != null) {
            let curDrinkThumb: string = drinks[currentDrinkIndex].strDrinkThumb;
            let element: Element | null = document.getElementsByClassName(
                "drink-background-blur"
            )[0];

            if (element != null) {
                (element as HTMLElement).style.backgroundImage =
                    "url('" + curDrinkThumb + "')";
            }
        }
    }, [currentDrinkIndex]);

    //The different directions to go through.
    enum Direction {
        LEFT,
        RIGHT,
    }

    //Set the current drink index based on direction.
    function handleButtonClick(dir: Direction) {
        if (dir == Direction.LEFT) {
            if (currentDrinkIndex == 0) {
                setCurrentDrinkIndex(drinks.length - 1);
            } else {
                setCurrentDrinkIndex((currentDrinkIndex) => {
                    if (currentDrinkIndex == null) {
                        return null;
                    } else {
                        return currentDrinkIndex - 1;
                    }
                });
            }
        } else if (dir == Direction.RIGHT) {
            if (currentDrinkIndex == drinks.length - 1) {
                setCurrentDrinkIndex(0);
            } else {
                setCurrentDrinkIndex((currentDrinkIndex) => {
                    if (currentDrinkIndex == null) {
                        return null;
                    } else {
                        return currentDrinkIndex + 1;
                    }
                });
            }
        }
    }

    return currentDrinkIndex == null ? (
        <div className="no-drink-container">
            <p> No Drink Selected</p>
        </div>
    ) : (
        <>
            <div className="container">
                <div className="drink-background-blur"></div>
                <button
                    id="previous-drink-button"
                    className="cycle-button"
                    onClick={() => handleButtonClick(Direction.LEFT)}
                >
                    <img className="flipped" src="src\assets\arrow-navigation.svg" />
                </button>

                <div className="drink-card-container">
                    <DrinkCard drink={drinks[currentDrinkIndex]} />
                </div>
                <button
                    id="next-drink-button"
                    className="cycle-button"
                    onClick={() => handleButtonClick(Direction.RIGHT)}
                >
                    <img src="src\assets\arrow-navigation.svg" />
                </button>
            </div>
        </>
    );
}
