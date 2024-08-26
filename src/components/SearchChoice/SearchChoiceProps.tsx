import { FOCUSTYPE } from "../ContentPage/ContentPage";

export default interface SearchChoiceProps {
    side: FOCUSTYPE;
    focusSide: FOCUSTYPE;
    setFocusSide: React.Dispatch<React.SetStateAction<FOCUSTYPE>>;
}
