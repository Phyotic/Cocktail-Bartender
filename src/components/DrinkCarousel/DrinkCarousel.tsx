import DrinkCard from "../DrinkCard/DrinkCard";
import DrinkCarouselProps from "./DrinkCarouselProps";
import "./DrinkCarousel.css";
import { useEffect, useState } from "react";

export default function DrinkCarousel({ drinks }: DrinkCarouselProps) {
    //Pointer to current drink in the drinks list.
    let [currentDrinkIndex, setCurrentDrinkIndex] = useState<number | null>(null);

    //Reset the pointer to the drinks list if possible, otherwise it is null.
    useEffect(() => {
        if (drinks != null && drinks.length != 0) {
            setCurrentDrinkIndex(0);
        } else {
            setCurrentDrinkIndex(null);
        }
    }, [drinks]);

    //Set a blurry background of drink.
    useEffect(() => {
        if (currentDrinkIndex != null) {
            let curDrinkThumb: string = `url("${drinks[currentDrinkIndex].strDrinkThumb}")`;
            let oldImage: HTMLElement = document.getElementsByClassName(
                "drink-background-blur-old"
            )[0] as HTMLElement;

            let newImage: HTMLElement = document.getElementsByClassName(
                "drink-background-blur-new"
            )[0] as HTMLElement;

            if (oldImage != null && newImage != null) {
                if (oldImage.style.backgroundImage.length == 0) {
                    oldImage.style.backgroundImage = curDrinkThumb;
                    oldImage.classList.add("animate-fade-in");
                } else {
                    newImage.style.backgroundImage = curDrinkThumb;
                    newImage.classList.add("animate-fade-in");
                    oldImage.classList.add("animate-fade-out");

                    const cleanUpBackgroundImagesBound = () => {
                        cleanUpBackgroundImages(
                            newImage,
                            oldImage,
                            curDrinkThumb,
                            cleanUpBackgroundImagesBound
                        );
                    };

                    newImage.addEventListener(
                        "animationend",
                        cleanUpBackgroundImagesBound
                    );
                }
            }
        }
    }, [currentDrinkIndex]);

    function cleanUpBackgroundImages(
        newImage: HTMLElement,
        oldImage: HTMLElement,
        curDrinkThumb: string,
        cleanUpBackgroundImagesBound: (event: AnimationEvent) => void
    ) {
        newImage.removeEventListener("animationend", cleanUpBackgroundImagesBound);
        oldImage.style.backgroundImage = curDrinkThumb;
        newImage.classList.remove("animate-fade-in");
        oldImage.classList.remove("animate-fade-out");
        oldImage.classList.add("animate-fade-in");
        newImage.style.visibility = "0";
    }

    //The different directions to go through.
    enum Direction {
        LEFT,
        RIGHT,
    }

    //Fade out ingredients set the current drink index based on direction.
    function handleButtonClick(dir: Direction) {
        //Fade out ingredients and call cascadeAnimations.
        let ingredients: HTMLCollection = document.getElementsByClassName("ingredient");
        if (ingredients != null) {
            for (let i: number = ingredients.length - 1; i >= 0; i--) {
                let ingredient: Element = ingredients[i];
                ingredient.classList.remove("animate-fade-in");
                ingredient.classList.add("animate-fade-out");

                if (i == 0) {
                    setTimeout(() => {
                        cascadeAnimations();
                    }, ingredients.length * 200);
                }
            }
        }

        //Set the next drink
        setTimeout(() => {
            if (dir == Direction.LEFT) {
                if (currentDrinkIndex == 0) {
                    setCurrentDrinkIndex(drinks.length - 1);
                } else {
                    setCurrentDrinkIndex((currentDrinkIndex) => {
                        if (currentDrinkIndex == null) {
                            return null;
                        } else {
                            return currentDrinkIndex - 1;
                        }
                    });
                }
            } else if (dir == Direction.RIGHT) {
                if (currentDrinkIndex == drinks.length - 1) {
                    setCurrentDrinkIndex(0);
                } else {
                    setCurrentDrinkIndex((currentDrinkIndex) => {
                        if (currentDrinkIndex == null) {
                            return null;
                        } else {
                            return currentDrinkIndex + 1;
                        }
                    });
                }
            }
        }, ingredients.length * 350);
    }

    //Fade image and drink name, call animation end.
    function cascadeAnimations() {
        let img: HTMLElement | null = document.getElementById("drink-image");
        if (img != null) {
            img.classList.remove("animate-fade-in");

            let name: HTMLElement | null = document.getElementById("drink-name");
            if (name) {
                name.classList.remove("animate-fade-in");
                name.classList.add("animate-fade-out");
                img.addEventListener("animationend", handleAnimationEnd);
                setTimeout(() => {
                    img.classList.add("animate-fade-out");
                }, 0.5);
            }
        }
    }

    //
    async function handleAnimationEnd(): Promise<void> {
        let img: HTMLElement | null = document.getElementById("drink-image");
        let name: HTMLElement | null = document.getElementById("drink-name");

        if (img != null) {
            img.removeEventListener("animationend", handleAnimationEnd);

            if (name != null) {
                name.classList.remove("animate-fade-in");
                void name.offsetWidth;
                name.classList.add("animate-fade-in");
            }

            img.classList.remove("animate-fade-out");
            img.classList.add("animate-fade-in");
        }
    }

    return currentDrinkIndex == null ? (
        <div className="no-drink-container">
            <p> No Drink Selected</p>
        </div>
    ) : (
        <>
            <div className="container">
                <div className="drink-background-blur-old"></div>
                <div className="drink-background-blur-new"></div>
                <button
                    id="previous-drink-button"
                    className="cycle-button"
                    onClick={() => handleButtonClick(Direction.LEFT)}
                >
                    <img className="flipped" src="src\assets\arrow-navigation.svg" />
                </button>

                <div className="drink-card-container">
                    <DrinkCard drink={drinks[currentDrinkIndex]} />
                </div>
                <button
                    id="next-drink-button"
                    className="cycle-button"
                    onClick={() => handleButtonClick(Direction.RIGHT)}
                >
                    <img src="src\assets\arrow-navigation.svg" />
                </button>
            </div>
        </>
    );
}
