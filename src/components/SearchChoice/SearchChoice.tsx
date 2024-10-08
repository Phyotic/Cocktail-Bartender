import { useState } from "react";
import { FOCUSTYPE } from "../ContentPage/ContentPage";
import "./SearchChoice.css";
import "../ContentPage/ContentPage.css";
import SearchForm from "../SearchForm/SearchForm";
import DrinkCarousel from "../DrinkCarousel/DrinkCarousel";
import SearchChoiceProps from "./SearchChoiceProps";

export default function SearchChoice({
    side,
    focusSide,
    setFocusSide,
}: SearchChoiceProps) {
    //All drinks returned from the search.
    let [searchedDrinks, setSearchedDrinks] = useState<Drink[]>([]);

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

    return side == focusSide ? (
        <section className={"search-section-with-drink-card " + focusState}>
            <SearchForm buttonState={buttonState} setSearchedDrinks={setSearchedDrinks} />

            <DrinkCarousel drinks={searchedDrinks} />
        </section>
    ) : (
        <section className={"search-section " + focusState}>
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
