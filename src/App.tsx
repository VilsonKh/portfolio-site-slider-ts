import { useEffect, useState } from "react";
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
	const [mobileThumbsSwiper, setMobileThumbsSwiper] = useState(null)
	const [currentIndex, setCurrentIndex] = useState(1);
	const [isHide, setIsHide] = useState(false);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleWindowResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleWindowResize);

		return () => {
			window.removeEventListener("resize", handleWindowResize);
		};
	});

	return (
		<div className="App">
			<Logo />
			<MainSlider
				windowWidth={windowWidth}
				isHide={isHide}
				setCurrentIndex={setCurrentIndex}
				thumbsSwiper={thumbsSwiper}
				mobileThumbsSwiper={mobileThumbsSwiper}
				setMainSwiper={setMainSwiper}
			/>
			{windowWidth > 1000 ? (
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
			) : (
				<MobileThumbs mainSwiper={mainSwiper} setMobileThumbsSwiper={setMobileThumbsSwiper}/>
			)}
			<BurgerButton />
		</div>
	);
}

export default App;
