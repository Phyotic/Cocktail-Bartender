import RandomChoice from "../RandomChoice/RandomChoice";
import SearchChoice from "../SearchChoice/SearchChoice";
import { useState } from "react";

export enum FOCUSTYPE {
    LEFT = "left",
    RIGHT = "right",
    NONE = "none",
}

export const ANIMATION_DELAY_SYNC: number = 200;

export default function ContentPage() {
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
