import { FOCUSTYPE } from "../ContentPage/ContentPage";

export default interface RandomChoiceProps {
    side: FOCUSTYPE;
    focusSide: FOCUSTYPE;
    setFocusSide: React.Dispatch<React.SetStateAction<FOCUSTYPE>>;
}
