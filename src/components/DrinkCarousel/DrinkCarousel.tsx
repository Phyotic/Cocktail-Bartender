import DrinkCard from "../DrinkCard/DrinkCard";
import DrinkCarouselProps from "./DrinkCarouselProps";
import "./DrinkCarousel.css";
import { useEffect, useState } from "react";
import { ANIMATION_DELAY_SYNC } from "../ContentPage/ContentPage";

export default function DrinkCarousel({ drinks }: DrinkCarouselProps) {
    //Pointer to current drink in the drinks list.
    let [currentDrinkIndex, setCurrentDrinkIndex] = useState<number | null>(null);
    let [isFadingOut, setIsFadingOut] = useState<boolean>(false);

    //The different directions to go through.
    enum Direction {
        LEFT,
        RIGHT,
    }

    //Reset the pointer to the drinks list if possible, otherwise it is null.
    useEffect(() => {
        if (drinks != null && drinks.length != 0) {
            setCurrentDrinkIndex(0);
        } else {
            setCurrentDrinkIndex(null);
        }
    }, [drinks]);

    //Fade out ingredients set the current drink index based on direction.
    function handleButtonClick(dir: Direction) {
        setIsFadingOut(true);

        //Set the next drink
        let ingredients: HTMLCollection = document.getElementsByClassName("ingredient");
        setTimeout(() => {
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
        }, ingredients.length * ANIMATION_DELAY_SYNC);

        setTimeout(() => {
            setIsFadingOut(false);
        }, ingredients.length * ANIMATION_DELAY_SYNC);
    }

    return currentDrinkIndex == null ? (
        <div className="no-drink-container">
            <p> No Drink Selected</p>
        </div>
    ) : (
        <>
            <div className="container">
                <button
                    id="previous-drink-button"
                    className="cycle-button"
                    onClick={() => handleButtonClick(Direction.LEFT)}
                >
                    <img className="flipped" src="src\assets\arrow-navigation.svg" />
                </button>

                <DrinkCard
                    drink={drinks[currentDrinkIndex]}
                    isFadingOut={isFadingOut}
                    animationTiming={ANIMATION_DELAY_SYNC}
                />

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
