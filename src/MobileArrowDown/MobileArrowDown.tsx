import "./MobileArrowDown.scss";

const MobileArrowDown = ({setIsMobileThumbHide, isMobileThumbHide}: {setIsMobileThumbHide: (value: any) => void, isMobileThumbHide: boolean}) => {
	return (
		<button
			className="mobileThumbs__arrowUp"
			onClick={() => setIsMobileThumbHide(!isMobileThumbHide)}
		>
			<img
				src="./assets/arrow-down-icon.svg"
				alt="arrow-up"
			/>
		</button>
	);
};

export default MobileArrowDown;
