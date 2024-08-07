import DrinkCard from "../DrinkCard/DrinkCard";
import DrinkCarouselProps from "./DrinkCarouselProps";
import "./DrinkCarousel.css";
import { useEffect, useState } from "react";

export default function DrinkCarousel({ drinks }: DrinkCarouselProps) {
    //Pointer to current drink in the drinks list.
    let [currentDrinkIndex, setCurrentDrinkIndex] = useState<number | null>(null);

    useEffect(() => {
        if (drinks != null && drinks.length != 0) {
            setCurrentDrinkIndex(0);
        } else {
            setCurrentDrinkIndex(null);
        }
    }, [drinks]);

    //The different directions to go through.
    enum Direction {
        LEFT,
        RIGHT,
    }

    //Set the current drink index based on direction.
    function handleButtonClick(dir: Direction) {
        if (dir == Direction.LEFT) {
            console.log("Previous drink");
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
            console.log("Next drink");
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
        <div>
            <p> No Drink</p>
        </div>
    ) : (
        <>
            <div className="container">
                <button
                    id="previous-drink-button"
                    onClick={() => handleButtonClick(Direction.LEFT)}
                >
                    &lt;
                </button>
                <DrinkCard drink={drinks[currentDrinkIndex]} />
                <button
                    id="next-drink-button"
                    onClick={() => handleButtonClick(Direction.RIGHT)}
                >
                    &gt;
                </button>
            </div>
        </>
    );
}
