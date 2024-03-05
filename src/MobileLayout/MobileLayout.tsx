import React, { useState } from "react";
import MobileThumbs from "../MobileThumbs/MobileThumbs";
import MobileArrowDown from "../MobileArrowDown/MobileArrowDown";
import BurgerButton from "../BurgerButton/BurgerButton";
import MobileDescriptionPopup from "../MobileDescriptionPopup/MobileDescriptionPopup";
import TouchMovePopup from "../TouchMovePopup/TouchMovePopup";

const MobileLayout = ({
	mainSwiper,
	setMobileThumbsSwiper,
	setIsMobileThumbHide,
	isMobileThumbHide,
	currentIndex,
}: {
	mainSwiper: any;
	setMobileThumbsSwiper: (value: any) => void;
	setIsMobileThumbHide: (value: any) => void;
	isMobileThumbHide: boolean;
	currentIndex: number;
}) => {
	const [isDescriptionPopup, setIsDescriptionPopup] = useState<boolean>(false);
	const [isTouchMovePopup, setIsTouchMovePopup] = useState<boolean>(true);

	return (
		<>
			<MobileThumbs
				mainSwiper={mainSwiper}
				setMobileThumbsSwiper={setMobileThumbsSwiper}
				setIsMobileThumbHide={setIsMobileThumbHide}
				isMobileThumbHide={isMobileThumbHide}
			/>
			<MobileArrowDown
				setIsMobileThumbHide={setIsMobileThumbHide}
				isMobileThumbHide={isMobileThumbHide}
			/>
			<BurgerButton setIsDescriptionPopup={setIsDescriptionPopup} />
			{isDescriptionPopup && <MobileDescriptionPopup setIsDescriptionPopup={setIsDescriptionPopup} currentIndex={currentIndex}/>}
			{isTouchMovePopup && sessionStorage.getItem("isNewVisit") === null &&<TouchMovePopup setIsTouchMovePopup={setIsTouchMovePopup}/>}
		</>
	);
};

export default MobileLayout;
