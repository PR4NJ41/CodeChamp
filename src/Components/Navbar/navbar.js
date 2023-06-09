import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
const Navbar = () => {
	return (
		<div className="mainNav">
			<div className="header">
				<div className="navLogo">Coding Profile</div>
				<nav>
					<ul className="nav__links">
						<li>
							<NavLink to="/">Profile</NavLink>
						</li>
						<li>
							<NavLink to="/Contests">Contests</NavLink>
						</li>
						<li>
							<NavLink to="/Questions">Questions</NavLink>
						</li>
						<li>
							<NavLink to="/Magic">Magic</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
};

export default Navbar;
