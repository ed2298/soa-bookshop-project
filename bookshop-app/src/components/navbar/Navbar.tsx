import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useAuth0 } from '../../contexts/auth0-context';

function Navbar() {
    const { isLoading, user, loginWithRedirect, logout, isAuthenticated } = useAuth0();

    return (
        <header>
            <div className="container-fluid position-relative no-side-padding">
               
                {user && user.picture && 
                    <span className="logo"> 
                        <img src={user.picture} alt="My Avatar" />
                    </span>
                }

                <div className="menu-nav-icon" data-nav-menu="#main-menu">
                    <i className="ion-navicon" />
                </div>

                <ul className="main-menu visible-on-click" id="main-menu">
                    <li><Link className={"nav-link"} to={"/"}> Bookshop App </Link></li>
                    <li>
                    <Link className={"nav-link"} to={"/"}>
                        {!isLoading && !user && (
                            <>
                                <button className="btn btn-primary" onClick={loginWithRedirect}>
                                    Sign In
                                </button>
                            </>
                        )}

                        {!isLoading && user && (
                            <>
                                <div>
                                    <label className="mr-2">You're logged in as {user.name}</label>
                                    <button className="btn btn-primary" onClick={() => logout({ returnTo: window.location.origin })}>
                                        Sign Out 
                                    </button>
                                </div>
                            </>
                        )}
                    </Link>
                    </li>
                    {isAuthenticated && (<li><Link className={"nav-link"} to={"/create"}> Add a new Book </Link></li>)}
                    {isAuthenticated && (<li><Link className={"nav-link"} to={`/myBooks/${user.email}`}> My added books </Link></li>)}
                    {isAuthenticated && (<li><Link className={"nav-link"} to={"/discounts"}> See Discounts </Link></li>)}
                </ul>
            </div>
        </header>
    );
}

export default withRouter(Navbar);
