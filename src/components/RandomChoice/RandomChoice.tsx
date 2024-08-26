import { FOCUSTYPE } from "../ContentPage/ContentPage";
import RandomChoiceProps from "./RandomChoiceProps";
import "./RandomChoice.css";
import "../ContentPage/ContentPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import DrinkCard from "../DrinkCard/DrinkCard";
import { ANIMATION_DELAY_SYNC } from "../ContentPage/ContentPage";

const RANDOM_API_URL: string = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

export default function RandomChoice({
    side,
    focusSide,
    setFocusSide,
}: RandomChoiceProps) {
    let [randomDrink, setRandomDrink] = useState<Drink | null>(null);
    let [isFadingOut, setIsFadingOut] = useState<boolean>(false);
    let [ingredientCount, setIngredientCount] = useState<number>(0);

    //Fades out drink card, calls fetchRandomDrink, and then fades in new drink card.
    async function handleClick(): Promise<void> {
        setIsFadingOut(true);

        setTimeout(() => {
            fetchRandomDrink();
        }, ingredientCount * ANIMATION_DELAY_SYNC);

        setTimeout(() => {
            setIsFadingOut(false);
        }, ingredientCount * ANIMATION_DELAY_SYNC + 100);
    }

    // Fetch a random drink. Set this component as the main focus of the container on the page.
    async function fetchRandomDrink(): Promise<void> {
        try {
            if (side != focusSide) {
                setFocusSide(side);
            }

            const response = await axios.get(RANDOM_API_URL);
            let drink: Drink = response.data.drinks[0];

            let ingreCount: number = 0;
            for (let i: number = 1; i <= 15; i++) {
                let str: string = "strIngredient" + i;

                if (drink[str as keyof Drink] == null) {
                    break;
                } else {
                    ingreCount++;
                }
            }

            setIngredientCount(ingreCount);
            setRandomDrink(drink);
        } catch (error) {
            console.error(error);
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

    /*
        If this component has the main focus, display the DrinkCard component.
        Otherwise, display a neutral state.
    */
    return side == focusSide ? (
        <section className={"drink-card-with-button " + focusState}>
            <DrinkCard
                drink={randomDrink}
                isFadingOut={isFadingOut}
                animationTiming={ANIMATION_DELAY_SYNC}
            />
            <button
                className={"random-drink-button " + buttonState}
                onClick={() => handleClick()}
            >
                New Random Drink
            </button>
        </section>
    ) : (
        <section className={"random-section " + focusState}>
            <button
                className={"random-drink-button " + buttonState}
                onClick={() => fetchRandomDrink()}
            >
                Random
            </button>
        </section>
    );
}
