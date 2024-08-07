import { Dispatch, SetStateAction } from "react";

export default interface SearchFormProps {
    buttonState: string;
    setSearchedDrinks: Dispatch<SetStateAction<Drink[]>>;
}
