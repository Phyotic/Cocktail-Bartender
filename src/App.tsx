import ContentPage from "./components/ContentPage/ContentPage";

export default function App() {
    return (
        <>
            <section id="hero-image">
                <h1 className="text-styling">Cocktail Bartender</h1>
                <h2 className="text-styling">A cocktail library</h2>

                <div id="arrow-pointer-container">
                    <div id="arrow-pointer-content">
                        <h2 className="text-styling">View Cocktails</h2>
                        <a id="arrow-link" href="#bottom-section">
                            <img
                                className="animate-bounce"
                                src="src/assets/down-long-solid.svg"
                                width={100}
                                height={100}
                            ></img>
                        </a>
                    </div>
                </div>
            </section>

            <section id="bottom-section">
                <ContentPage />
            </section>
        </>
    );
}
