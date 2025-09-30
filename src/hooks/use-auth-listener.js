import { useState } from 'react';
// import { FirebaseContext } from '../context/firebase';

export default function useAuthListener() {
    const [user] = useState(null);
    // const { firebase } = useContext(FirebaseContext);

    /*
    useEffect(() => {
        const listener = firebase.auth().onAuthStateChanged((authUser) => {
            if (authUser) {
                localStorage.setItem('authUser', JSON.stringify(authUser));
                setUser(authUser);
            } else {
                localStorage.removeItem('authUser');
                setUser(null);
            }
        });

        return () => listener();
    }, []);
    */

    return { user };
}
