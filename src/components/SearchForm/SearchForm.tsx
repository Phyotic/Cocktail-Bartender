import SearchFormProps from "./SearchFormProps";
import { SyntheticEvent, useState } from "react";
import "./SearchForm.css";
import axios from "axios";

interface FormData {
    drinkName: string;
}

export default function SearchForm({ buttonState, setSearchedDrinks }: SearchFormProps) {
    //Form data values
    let [userInput, setUserInput] = useState<FormData>({ drinkName: "" });

    //onSubmit handler
    function handleOnSubmit(event: SyntheticEvent) {
        event.preventDefault();
        let name: string = userInput.drinkName;
        if (name.length == 0) {
            name = "error";
        }
        searchForDrink(name);
    }

    //Search for the specified drink and set the drinks list to the response.
    async function searchForDrink(name: string): Promise<void> {
        try {
            const response = await axios.get(
                "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + name
            );

            console.log("success");
            console.log(response);
            setSearchedDrinks(response.data.drinks);
        } catch (e) {
            console.log("error");
            console.log(e);
        }
    }

    return (
        <>
            <form
                id="search-form"
                onSubmit={(event) => {
                    handleOnSubmit(event);
                }}
            >
                <div className="input-label-pair">
                    <label htmlFor="search-drink-name">Drink Name</label>
                    <input
                        type="text"
                        id="search-drink-name"
                        placeholder="Margarita"
                        onChange={(e) =>
                            setUserInput({ ...userInput, drinkName: e.target.value })
                        }
                        value={userInput.drinkName}
                        name="searchDrinkName"
                    ></input>
                </div>

                <input
                    type="submit"
                    value="Search"
                    id="search-drink-button"
                    className={buttonState}
                />
            </form>
        </>
    );
}
