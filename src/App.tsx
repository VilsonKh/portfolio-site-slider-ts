import { useState } from "react";
import Logo from "./Logo/Logo";
import MainSlider from "./MainSlider/MainSlider";
import NavMenu from "./NavMenu/NavMenu";
import DescriptionBar from "./DescriptionBar/DescriptionBar";
import HideBarButton from "./HideBarButton/HideBarButton";
import BurgerButton from "./BurgerButton/BurgerButton";
import MobileThumbs from "./MobileThumbs/MobileThumbs";
function App() {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	const [mainSwiper, setMainSwiper] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(1);
	const [isHide, setIsHide] = useState(false);

	return (
		<div className="App">
			<Logo />
			<MainSlider isHide={isHide} setCurrentIndex={setCurrentIndex} thumbsSwiper={thumbsSwiper} setMainSwiper={setMainSwiper} />
			{window.screen.width > 1000 ? (
				<>
					<HideBarButton isHide={isHide} setIsHide={setIsHide} />
					<NavMenu isHide={isHide} mainSwiper={mainSwiper} setThumbsSwiper={setThumbsSwiper} />
					<DescriptionBar isHide={isHide} slideIndex={currentIndex} />
				</>
			) : <MobileThumbs/>}
			<BurgerButton />
		</div>
	);
}

export default App;
