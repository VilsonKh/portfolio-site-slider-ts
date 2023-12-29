import "./Logo.scss";

const Logo = () => {
	return (
		<div className="logo__container">
			<a href="https://devilson.me">
				<img src="./assets/logo.png" className="logo" alt="logo" />
			</a>
		</div>
	);
};

export default Logo;
