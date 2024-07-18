import axios from "axios";
import SearchFormProps from "./SearchFormProps";
import { SyntheticEvent, useState } from "react";
import "./SearchForm.css";

export default function SearchForm({
    buttonState,
    searchedDrink,
    isShowingDrink,
}: SearchFormProps) {
    let [userInput, setUserInput] = useState<string>("");

    function handleSearchDrinkButtonClick(event: SyntheticEvent) {
        event.preventDefault();
        console.log(event);
    }

    // async function fetchSearchDrink(event: SyntheticEvent): Promise<void> {
    //     try {
    //         const response = await axios.get(event.target)
    //     }
    // }

    return (
        <>
            <form>
                <div className="input-label-pair">
                    <label htmlFor="search-drink-name">Drink Name</label>
                    <input
                        id="search-drink-name"
                        placeholder="Margarita"
                        onChange={(e) => setUserInput(e.target.value)}
                        value={userInput}
                        name="search-drink-name"
                    ></input>
                </div>

                <input
                    type="submit"
                    value="Search"
                    id="search-drink-button"
                    className={buttonState}
                    onClick={(event) => {
                        handleSearchDrinkButtonClick(event);
                    }}
                />
            </form>
        </>
    );
}
