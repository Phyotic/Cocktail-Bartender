import SearchFormProps from "./SearchFormProps";
import { SyntheticEvent, useState } from "react";
import "./SearchForm.css";
import axios from "axios";

const API_SEARCH_DRINK_URL: string =
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

interface FormData {
    drinkName: string;
}

export default function SearchForm({ buttonState, setSearchedDrinks }: SearchFormProps) {
    //Form data values
    let [userInput, setUserInput] = useState<FormData>({ drinkName: "" });

    //Set a default of margarita if empty, call searchForDrink.
    function handleOnSubmit(event: SyntheticEvent) {
        event.preventDefault();
        let name: string = userInput.drinkName;
        if (name.length == 0) {
            name = "margarita";
        }
        searchForDrink(name);
    }

    //Search for the specified drink and set the drinks list to the response.
    async function searchForDrink(name: string): Promise<void> {
        try {
            const response = await axios.get(API_SEARCH_DRINK_URL + name);

            setSearchedDrinks(response.data.drinks);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <form
                onSubmit={(event) => {
                    handleOnSubmit(event);
                }}
            >
                <div className="input-label-pair">
                    <label htmlFor="search-drink-name">Drink Name</label>
                    <input
                        id="search-drink-name"
                        type="text"
                        placeholder="Margarita"
                        onChange={(e) =>
                            setUserInput({ ...userInput, drinkName: e.target.value })
                        }
                        value={userInput.drinkName}
                        name="searchDrinkName"
                    ></input>
                </div>

                <input type="submit" value="Search" className={buttonState} />
            </form>
        </>
    );
}
