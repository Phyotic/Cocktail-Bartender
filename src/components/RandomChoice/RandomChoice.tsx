import { FOCUSTYPE } from "../ContentPage/ContentPage";
import RandomChoiceProps from "./RandomChoiceProps";
import "./RandomChoice.css";
import { useState } from "react";
import axios from "axios";
import DrinkCard from "../DrinkCard/DrinkCard";

export default function RandomChoice({
    side,
    focusSide,
    setFocusSide,
}: RandomChoiceProps) {
    let [isShowingDrink, setShowingDrink] = useState<boolean>(false);
    let [randomDrink, setRandomDrink] = useState<Drink | null>(null);

    /*
     * Fetch a random drink. Set this component as the main focus of the container on the page.
     */
    async function fetchRandomDrink(): Promise<void> {
        try {
            const response = await axios.get(
                "https://www.thecocktaildb.com/api/json/v1/1/random.php"
            );
            setRandomDrink(response.data.drinks[0]);
            console.log("RandomDrink: ");
            console.log(randomDrink);

            if (side != focusSide) {
                setFocusSide(side);
            }

            setShowingDrink(true);
        } catch (error) {
            console.log(error);
        }
    }

    //Determine if this is the main interacting component.
    let focusState: string = FOCUSTYPE.NONE;
    if (focusSide !== FOCUSTYPE.NONE) {
        focusState =
            focusSide === side ? "focused-bottom-section" : "minimized-bottom-section";
    } else {
        focusState = "neutral-bottom-section";
    }

    //Determine a class for the button to determine appearance if this component is the main interacted component.
    let buttonState: string = "";
    if (focusSide == side) {
        buttonState = "focused-choice-button";
    } else if (focusSide == FOCUSTYPE.NONE) {
        buttonState = "neutral-choice-button";
    } else {
        buttonState = "minimized-choice-button";
    }

    return isShowingDrink ? (
        <section id="random-section-card" className={focusState}>
            <DrinkCard drink={randomDrink} />

            <button
                id="random-drink-button"
                className={buttonState}
                onClick={() => fetchRandomDrink()}
            >
                New Random Drink
            </button>
        </section>
    ) : (
        <section id="random-section" className={focusState}>
            <button
                id="random-drink-button"
                className={buttonState}
                onClick={() => fetchRandomDrink()}
            >
                Random
            </button>
        </section>
    );
}
