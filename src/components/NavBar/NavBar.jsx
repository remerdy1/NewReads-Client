import {useContext} from "react";
import {Link} from "react-router-dom";
import styles from "./NavBar.module.css"
import UserContext from "../../Store/UserContext";

const NavBar = () =>{
    const {user} = useContext(UserContext);
    
    return(
        <header className={styles.header}>
            <Link className={styles.logoLink} to="/">
                <p className={styles.logo}>New<strong>Reads</strong></p>
            </Link> 

            {user &&
                <>
                    <ul className={styles.navList}>
                        <li className={styles.listItem}>Home</li>
                        <li className={styles.listItem}>Best Sellers</li>
                        <li className={styles.listItem}>Favourites</li>
                    </ul>
                    {/*todo Icon*/}
                    <p className={styles.profile}>My Profile</p>
                </>
            }
        </header>
    )
}

export default NavBar