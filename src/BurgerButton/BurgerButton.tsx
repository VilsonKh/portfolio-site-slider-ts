import "./BurgerButton.scss";

const BurgerButton = ({ setIsDescriptionPopup }: { setIsDescriptionPopup: (value: boolean) => void }) => {
	return (
		<button className="burgerButton" onClick={() => setIsDescriptionPopup(true)}>
			<div className="burgerButton__element"></div>
			<div className="burgerButton__element"></div>
			<div className="burgerButton__element"></div>
		</button>
	);
};

export default BurgerButton;
