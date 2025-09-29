/* eslint-disable no-nested-ternary */
import React, { useContext, useState, useEffect } from 'react';
// import Fuse from 'fuse.js';
import { FirebaseContext } from '../context/firebase';
import { SelectProfileContainer } from './profiles';
// import { Card, Header, Loading } from '../components';
// import * as ROUTES from '../constants/routes';
// import logo from '../logo.svg';
// import { FooterContainer } from './footer';
// import Player from '../components/player';

export function BrowseContainer({ slides }) {
    // const [category, setCategory] = useState('series');
    const [searchTerm, setSearchTerm] = useState('');
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [slideRows, setSlideRows] = useState([]);

    const { firebase } = useContext(FirebaseContext);
    const user = firebase.auth().currentUser || {};

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, [profile.displayName]);

    // Search filtering logic (commented out because not being used right now)
    /*
    useEffect(() => {
        const fuse = new Fuse(slideRows, {
            keys: ['data.description', 'data.title', 'data.genre'],
        });
        const results = fuse.search(searchTerm).map(({ item }) => item);

        if (slideRows.length > 0 && searchTerm.length > 3 && results.length > 0) {
            setSlideRows(results);
        } else {
            setSlideRows(slides[category]);
        }
    }, [searchTerm]);
    */

    return profile.displayName ? (
        <>
            {/* Placeholder: Browse screen UI will go here */}
            <p>Browse screen under construction...</p>
        </>
    ) : (
        <SelectProfileContainer user={user} setProfile={setProfile} />
    );
}
// export function BrowseContainer({ slides }) {
//     const [category, setCategory] = useState('series');
//     const [searchTerm, setSearchTerm] = useState('');
//     const [profile, setProfile] = useState({});
//     const [loading, setLoading] = useState(true);
//     const [slideRows, setSlideRows] = useState([]);  
