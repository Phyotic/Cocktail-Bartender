import { FOCUSTYPE } from "../ContentPage/ContentPage";
import RandomChoiceProps from "./RandomChoiceProps";
import "./RandomChoice.css";
import "../ContentPage/ContentPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import DrinkCard from "../DrinkCard/DrinkCard";

const RANDOM_URL: string = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

export default function RandomChoice({
    side,
    focusSide,
    setFocusSide,
}: RandomChoiceProps) {
    let [isShowingDrink, setShowingDrink] = useState<boolean>(false);
    let [randomDrink, setRandomDrink] = useState<Drink | null>(null);

    //Set the background image of the random section card to a blurred drink image.
    useEffect(() => {
        let elementOld: HTMLElement | null = document.getElementById(
            "drink-background-image-old"
        );
        let elementNew: HTMLElement | null = document.getElementById(
            "drink-background-image-new"
        );

        if (elementOld != null && elementNew != null && randomDrink != null) {
            let newImage = `url('${randomDrink.strDrinkThumb}')`;

            elementNew.style.backgroundImage = newImage;
            elementOld.classList.add("animate-fade-out");
            elementNew.classList.add("animate-fade-in");
            elementNew.addEventListener("animationend", () => {
                cleanUpBackgroundImages(elementOld, elementNew, newImage);
            });
        }
    }, [randomDrink]);

    function cleanUpBackgroundImages(
        elementOld: HTMLElement,
        elementNew: HTMLElement,
        newImage: string
    ) {
        if (elementOld != null && elementNew != null) {
            elementOld.style.backgroundImage = newImage;
            elementOld.classList.remove("animate-fade-out");
            elementNew.classList.remove("animate-fade-in");
            elementNew.style.opacity = "0";
        }
    }

    //Creates fade out animation for each ingredient, then calls cascadeAnimations.
    function handleClick(): void {
        let ingredients: HTMLCollection = document.getElementsByClassName("ingredient");
        if (ingredients != null) {
            for (let i: number = ingredients.length - 1; i >= 0; i--) {
                let ingredient: Element = ingredients[i];
                ingredient.classList.remove("animate-fade-in");
                ingredient.classList.add("animate-fade-out");

                if (i == 0) {
                    setTimeout(() => {
                        cascadeAnimations();
                    }, ingredients.length * 200);
                }
            }
        }
    }

    //Creates fade out animation for img and drink name, then calls handleAnimationEnd.
    function cascadeAnimations() {
        let img: HTMLElement | null = document.getElementById("drink-image");
        if (img != null) {
            img.classList.remove("animate-fade-in");

            let name: HTMLElement | null = document.getElementById("drink-name");
            if (name) {
                name.classList.remove("animate-fade-in");
                name.classList.add("animate-fade-out");
                setTimeout(() => {
                    img.addEventListener("animationend", handleAnimationEnd);
                    img.classList.add("animate-fade-out");
                }, 0.5);
            }
        }
    }

    //Calls fetchRandomDrink and manages fade-out/fade-in after next drink is fetched.
    async function handleAnimationEnd(): Promise<void> {
        let img: HTMLElement | null = document.getElementById("drink-image");
        let name: HTMLElement | null = document.getElementById("drink-name");

        if (img != null) {
            img.removeEventListener("animationend", handleAnimationEnd);

            if (name != null) {
                name.classList.remove("animate-fade-in");
                void name.offsetWidth;
                name.classList.add("animate-fade-in");
            }

            img.style.visibility = "hidden";

            await fetchRandomDrink();

            img.style.visibility = "visible";
            img.classList.remove("animate-fade-out");
            img.classList.add("animate-fade-in");
        }
    }

    // Fetch a random drink. Set this component as the main focus of the container on the page.
    async function fetchRandomDrink(): Promise<void> {
        try {
            if (side != focusSide) {
                setFocusSide(side);
            }

            const response = await axios.get(RANDOM_URL);
            setRandomDrink(response.data.drinks[0]);
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

    /*
        If showing a drink and this has focus, display the drink card info.
        Otherwise, display a neutral state.
    */
    return isShowingDrink && side == focusSide ? (
        <section className={"random-section " + focusState}>
            <img id="drink-background-image-old" />
            <img id="drink-background-image-new" />

            <section className="random-section-content">
                <DrinkCard drink={randomDrink} />

                <button
                    className={"random-drink-button " + buttonState}
                    onClick={() => handleClick()}
                >
                    New Random Drink
                </button>
            </section>
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
