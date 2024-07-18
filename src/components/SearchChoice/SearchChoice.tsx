import { useState } from "react";
import { FOCUSTYPE } from "../ContentPage/ContentPage";
import RandomChoiceProps from "../RandomChoice/RandomChoiceProps";
import "./SearchChoice.css";
import DrinkCard from "../DrinkCard/DrinkCard";
import SearchForm from "../SearchForm/SearchForm";

export default function SearchChoice({
    side,
    focusSide,
    setFocusSide,
}: RandomChoiceProps) {
    //Flag that indicates whether a drink is currently being displayed.
    let [isShowingDrink, setShowingDrink] = useState<boolean>(false);
    let [searchedDrink, setSearchedDrink] = useState<Drink | null>(null);

    //Method that is called when the search button in the form is called.
    //TODO: complete it.
    function searchForDrink(): void {
        side == focusSide ? setFocusSide(FOCUSTYPE.NONE) : setFocusSide(side);
        // setShowingDrink(true);
    }

    //Evaluates whether this component has focus.
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

    //If this side has focus, display the form and the drink card
    return side == focusSide ? (
        <section id="search-section-with-drink-card" className={focusState}>
            <SearchForm
                buttonState={buttonState}
                searchedDrink={searchedDrink}
                isShowingDrink={isShowingDrink}
            />

            <DrinkCard drink={searchedDrink} />
        </section>
    ) : (
        <section id="search-section" className={focusState}>
            <button
                id="search-drink-button"
                className={buttonState}
                onClick={() => setFocusSide(side)}
            >
                Search
            </button>
        </section>
    );
}
