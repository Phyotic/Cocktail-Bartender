import "./DrinkCard.css";

export default function DrinkCard({ drink }: { drink: Drink | null }) {
    if (drink == null) {
        return (
            <>
                <section>
                    <p> Passed drink info is null</p>
                </section>
            </>
        );
    }

    let name = drink.strDrink;
    let ingredients = [];

    let strIng = "strIngredient";
    for (let i = 1; i <= 15; i++) {
        let ingProp = strIng + i;
        let value = drink[ingProp as keyof Drink];

        if (value === null) {
            break;
        }

        ingredients.push(value);
    }

    let imageURL = drink.strDrinkThumb;

    console.log(name);

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
