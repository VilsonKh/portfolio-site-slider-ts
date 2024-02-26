import React, { useState } from "react";
import MobileThumbs from "../MobileThumbs/MobileThumbs";
import MobileArrowDown from "../MobileArrowDown/MobileArrowDown";
import BurgerButton from "../BurgerButton/BurgerButton";
import MobileDescriptionPopup from "../MobileDescriptionPopup/MobileDescriptionPopup";

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
		</>
	);
};

export default MobileLayout;
