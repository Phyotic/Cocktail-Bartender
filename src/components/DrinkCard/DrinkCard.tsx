import "./DrinkCard.css";

export default function DrinkCard({ drink }: { drink: Drink | null }) {
    if (drink == null) {
        return (
            <>
                <section id="no-drink-selected">
                    <p> No Drink Selected</p>
                </section>
            </>
        );
    }

    let name: string = drink.strDrink;
    let ingredients: string[] = [];

    let strIng = "strIngredient";
    for (let i = 1; i <= 15; i++) {
        let ingProp = strIng + i;
        let value = drink[ingProp as keyof Drink];

        if (value === null) {
            break;
        }

        if (!ingredients.includes(value)) {
            ingredients.push(value);
        }
    }

    let imageURL = drink.strDrinkThumb;

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
