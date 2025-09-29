import React, { useEffect, useState } from 'react';
import axios from 'axios';
import requests from '../../request';     // Make sure this file exists
import Row from '../row';                 // Make sure this file exists
import Background from '../background';   // Make sure this file exists

function Header({ bg = true, children, ...restProps }) {
    return bg ? <Background {...restProps}>{children}</Background> : children;
}

// Define a sub-component of Header
Header.Banner = function HeaderBanner({ children, ...restProps }) {
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            const results = request.data.results;
            const randomIndex = Math.floor(Math.random() * results.length);
            setMovie(results[randomIndex]);
        }
        fetchData();
    }, []);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <header className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
                backgroundPosition: "center center",
            }}
        >
            <div className="banner_contents">
                <h1 className="banner_title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>

                <div className="banner_buttons">
                    <button className="banner_button">Play</button>
                    <button className="banner_button">My List</button>
                </div>

                <h1 className="banner_description">
                    {truncate(movie?.overview, 150)}
                </h1>
            </div>

            <div className="banner_fadeBottom" />

            <div className="nav nav_black" />

            <div>
                <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
                <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
                <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
                <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
                <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
                <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
                <Row title="Romance Movies" fetchUrl={requests.fetchRomanticMovies} />
                <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
            </div>
        </header>
    );
};

// ✅ THIS IS THE MISSING LINE!
export default Header;
