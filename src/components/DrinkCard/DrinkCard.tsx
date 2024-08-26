import "./DrinkCard.css";
import DrinkCardProps from "./DrinkCardProps";

//API magic numbers/variables.
const STR_INGREDIENT_PREFIX: string = "strIngredient";
const STR_MEASURE_PREFIX: string = "strMeasure";
const STR_INGREDIENT_COUNT: number = 15;
const STR_MEASURE_COUNT: number = 15;

export default function DrinkCard({
    drink,
    isFadingOut,
    animationTiming,
}: DrinkCardProps) {
    //Check for a null drink.
    if (drink == null) {
        return (
            <>
                <section id="no-drink-selected">
                    <p> No Drink Selected</p>
                </section>
            </>
        );
    }

    //Drink name and ingredients list.
    let name: string = drink.strDrink;
    let ingredients: string[] = [];
    let measurements: string[] = [];

    //Retrieve all ingredients from passed drink and push into list.
    let strIng: string = STR_INGREDIENT_PREFIX;
    for (let i = 1; i <= STR_INGREDIENT_COUNT; i++) {
        let ingProp: string = strIng + i;
        let value: string | null = drink[ingProp as keyof Drink];

        if (value === null || value == "") {
            break;
        }

        ingredients.push(value);
    }

    //Retrieve all ingredients measurements from passed drink and push into list.
    let strMsr: string = STR_MEASURE_PREFIX;
    for (let i = 1; i <= STR_MEASURE_COUNT; i++) {
        let measureProp: string = strMsr + i;
        let value: string | null = drink[measureProp as keyof Drink];

        if (value === null) {
            break;
        }

        measurements.push(value);
    }

    //Combine measurements and ingredients.
    let measureAndIng: string[] = [];
    for (let i: number = 0; i < ingredients.length; i++) {
        if (measurements[i] != undefined) {
            measureAndIng[i] = measurements[i] + " " + ingredients[i];
        } else {
            measureAndIng[i] = ingredients[i];
        }
    }

    //Retrieve image thumbnail url.
    let imageURL: string = drink.strDrinkThumb;

    return (
        <>
            <section className={"drink-card-container"}>
                <img id="drink-background-image-old" />
                <img id="drink-background-image-new" />

                {/* <section className="random-section-content"></section> */}
                <section className="drink-card">
                    <section className="drink-info">
                        <picture>
                            <img
                                id="drink-image"
                                className={
                                    isFadingOut ? "animate-fade-out" : "animate-fade-in"
                                }
                                src={imageURL}
                                alt={name}
                            ></img>
                        </picture>
                        <p
                            id="drink-name"
                            className={
                                isFadingOut ? "animate-fade-out" : "animate-fade-in"
                            }
                        >
                            {name}
                        </p>
                    </section>

                    <section className="drink-ingredients">
                        <ul>
                            {measureAndIng.map((item, index) => (
                                <li
                                    key={item}
                                    className={
                                        isFadingOut
                                            ? "ingredient animate-fade-out"
                                            : "ingredient animate-fade-in"
                                    }
                                    style={{
                                        animationDelay: `${
                                            index * animationTiming * 0.001
                                        }s`,
                                    }}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </section>
                </section>
            </section>
        </>
    );
}
