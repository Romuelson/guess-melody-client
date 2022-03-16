import { Link } from 'react-router-dom';

function Menu() {
	return (
		<nav className="header__menu menu">
			<ul className="menu__list">
				<li className="menu__item">
					<Link to="/" className="menu__link">
						Home
					</Link>
				</li>
				<li className="menu__item">
					<Link to="/catalog" className="menu__link">
						Catalog
					</Link>
				</li>
				<li className="menu__item">
					<Link to="/about" className="menu__link">
						About
					</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Menu;
