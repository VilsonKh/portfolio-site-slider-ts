import React from "react";
import MobileThumbs from "../MobileThumbs/MobileThumbs";
import MobileArrowDown from "../MobileArrowDown/MobileArrowDown";

const MobileLayout = ({
	mainSwiper,
	setMobileThumbsSwiper,
	setIsMobileThumbHide,
	isMobileThumbHide,
}: {
	mainSwiper: any;
	setMobileThumbsSwiper: (value: any) => void;
	setIsMobileThumbHide: (value: any) => void;
	isMobileThumbHide: boolean;
}) => {
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
		</>
	);
};

export default MobileLayout;
