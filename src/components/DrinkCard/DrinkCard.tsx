import "./DrinkCard.css";

//API magic numbers/variables.
const STR_INGREDIENT_PREFIX: string = "strIngredient";
const STR_INGREDIENT_COUNT: number = 15;

export default function DrinkCard({ drink }: { drink: Drink | null }) {
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

    //Retrieve all ingredients from passed drink and push into list.
    let strIng: string = STR_INGREDIENT_PREFIX;
    for (let i = 1; i <= STR_INGREDIENT_COUNT; i++) {
        let ingProp: string = strIng + i;
        let value: string | null = drink[ingProp as keyof Drink];

        if (value === null) {
            break;
        }

        if (!ingredients.includes(value)) {
            ingredients.push(value);
        }
    }

    //Retrieve image thumbnail url.
    let imageURL: string = drink.strDrinkThumb;

    return (
        <>
            <section className="drink-card">
                <section className="drink-info">
                    <picture>
                        <img id="drink-image" src={imageURL} alt={name}></img>
                    </picture>
                    <p>{name}</p>
                </section>

                <section className="drink-ingredients">
                    <ul>
                        {ingredients.map((item) => (
                            <li key={item} className="ingredient">
                                {item}
                            </li>
                        ))}
                    </ul>
                </section>
            </section>
        </>
    );
}
