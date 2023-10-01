import { FOCUSTYPE } from "../ContentPage/ContentPage";
import RandomChoiceProps from "../RandomChoice/RandomChoiceProps";
import "./SearchChoice.css";

export default function SearchChoice({
    side,
    focusSide,
    setFocusSide,
}: RandomChoiceProps) {
    function searchDrink(): void {
        side == focusSide ? setFocusSide(FOCUSTYPE.NONE) : setFocusSide(side);
    }

    let focusState: string = FOCUSTYPE.NONE;

    if (focusSide !== FOCUSTYPE.NONE) {
        focusState =
            focusSide === side ? "focused-bottom-section" : "minimized-bottom-section";
    } else {
        focusState = "neutral-bottom-section";
    }

    //Determine button style based on focus.
    let buttonState: string = "";
    if (focusSide == side) {
        buttonState = "focused-choice-button";
    } else if (focusSide == FOCUSTYPE.NONE) {
        buttonState = "neutral-choice-button";
    } else {
        buttonState = "minimized-choice-button";
    }

    return (
        <section id="search-section" className={focusState}>
            <button
                id="search-drink-button"
                className={buttonState}
                onClick={() => searchDrink()}
            >
                Search
            </button>
            {/* <h1 id="search-drink" className="choice-words">
                Search
            </h1> */}
        </section>
    );
}
