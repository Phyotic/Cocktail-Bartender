import RandomChoice from "../RandomChoice/RandomChoice";
import SearchChoice from "../SearchChoice/SearchChoice";
import { useState } from "react";

//Possible focus sections.
export enum FOCUSTYPE {
    LEFT = "left",
    RIGHT = "right",
    NONE = "none",
}

//Used for determining fade-in and fade-out speed.
export const ANIMATION_DELAY_SYNC: number = 200;

export default function ContentPage() {
    //Determine which side has the main focus.
    let [focusSide, setFocusSide] = useState<FOCUSTYPE>(FOCUSTYPE.NONE);

    return (
        <>
            <RandomChoice
                side={FOCUSTYPE.LEFT}
                focusSide={focusSide}
                setFocusSide={setFocusSide}
            />

            <SearchChoice
                side={FOCUSTYPE.RIGHT}
                focusSide={focusSide}
                setFocusSide={setFocusSide}
            />
        </>
    );
}
