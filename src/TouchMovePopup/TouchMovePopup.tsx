import "./TouchMovePopup.scss";
const TouchMovePopup = ({ setIsTouchMovePopup }: { setIsTouchMovePopup: (value: boolean) => void }) => {

  return (
		<div
			className="touchMovePopup"
			onClick={() => {
				setIsTouchMovePopup(false);
				sessionStorage.setItem("isNewVisit", "true");
			}}
		>
			<div className="touchMovePopup__overlay"></div>
			<div className="touchMovePopup__iconsContainer">
				<img
					className="touchMovePopup__leftHand"
					src="./assets/left-hand-pinch.svg"
					alt=""
				/>
				<img
					className="touchMovePopup__rightHand"
					src="./assets/right-hand-pinch.svg"
					alt=""
				/>
			</div>
			<p className="touchMovePopup__text">touch to continue</p>
		</div>
	);
};

export default TouchMovePopup;
