import DescriptionBar from "../DescriptionBar/DescriptionBar";
import HideBarButton from "../HideBarButton/HideBarButton";
import NavMenu from "../NavMenu/NavMenu";
import "./DesktopLayout.scss";

const DesktopLayout = ({
	isHide,
	setIsHide,
	mainSwiper,
	setThumbsSwiper,
	currentIndex,
}: {
	isHide: boolean;
	setIsHide: (value: any) => void;
	mainSwiper: any;
	setThumbsSwiper: any;
	currentIndex: number;
}) => {
	return (
		<>
			<HideBarButton
				isHide={isHide}
				setIsHide={setIsHide}
			/>
			<NavMenu
				isHide={isHide}
				mainSwiper={mainSwiper}
				setThumbsSwiper={setThumbsSwiper}
			/>
			<DescriptionBar
				isHide={isHide}
				slideIndex={currentIndex}
			/>
		</>
	);
};

export default DesktopLayout;
