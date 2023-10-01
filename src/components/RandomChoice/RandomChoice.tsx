import { FOCUSTYPE } from "../ContentPage/ContentPage";
import RandomChoiceProps from "./RandomChoiceProps";
import "./RandomChoice.css";

export default function RandomChoice({
    side,
    focusSide,
    setFocusSide,
}: RandomChoiceProps) {
    /*
     * Fetch a random drink. Set this component as the main focus of the container on the page.
     */
    function fetchRandomDrink(): void {
        side == focusSide ? setFocusSide(FOCUSTYPE.NONE) : setFocusSide(side);
    }

    let focusState: string = FOCUSTYPE.NONE;

    if (focusSide !== FOCUSTYPE.NONE) {
        focusState =
            focusSide === side ? "focused-bottom-section" : "minimized-bottom-section";
    } else {
        focusState = "neutral-bottom-section";
    }

    let buttonState: string = "";

    if (focusSide == side) {
        buttonState = "focused-choice-button";
    } else if (focusSide == FOCUSTYPE.NONE) {
        buttonState = "neutral-choice-button";
    } else {
        buttonState = "minimized-choice-button";
    }

    return (
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
