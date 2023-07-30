function App() {
    return (
        <>
            <section id="hero-image">
                <h1>Cocktail Bartender</h1>
                <h2>Your personal teacher</h2>

                <div id="arrow-pointer-container">
                    <div id="arrow-pointer-content">
                        <h2>Start Learning</h2>
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
                <section id="random-section">
                    <h1 className="choice-words">Random</h1>
                </section>
                <section id="search-section">
                    <h1 className="choice-words">Search</h1>
                </section>
            </section>
        </>
    );
}

export default App;
