import { useEffect, useState } from "react";
import Logo from "./Logo/Logo";
import MainSlider from "./MainSlider/MainSlider";
import "./App.scss";
import DesktopLayout from "./DesktopLayout/DesktopLayout";
import MobileLayout from "./MobileLayout/MobileLayout";

function App() {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	const [mainSwiper, setMainSwiper] = useState(null);
	const [mobileThumbsSwiper, setMobileThumbsSwiper] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(1);
	const [isHide, setIsHide] = useState(false);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [isMobileThumbHide, setIsMobileThumbHide] = useState<boolean>(false);

	useEffect(() => {
		const handleWindowResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleWindowResize);

		return () => {
			window.removeEventListener("resize", handleWindowResize);
		};
	});

	const mainSliderProps = {
		windowWidth: windowWidth,
		isHide: isHide,
		setCurrentIndex: setCurrentIndex,
		thumbsSwiper: thumbsSwiper,
		mobileThumbsSwiper: mobileThumbsSwiper,
		setMainSwiper: setMainSwiper,
		currentIndex: currentIndex,
	};

	const desktopLayoutProps = {
		isHide: isHide,
		setIsHide: setIsHide,
		mainSwiper: mainSwiper,
		setThumbsSwiper: setThumbsSwiper,
		currentIndex: currentIndex,
	};

	const mobileLayoutProps = {
		mainSwiper: mainSwiper,
		setMobileThumbsSwiper: setMobileThumbsSwiper,
		setIsMobileThumbHide: setIsMobileThumbHide,
		isMobileThumbHide: isMobileThumbHide,
		currentIndex: currentIndex
	};

	return (
		<div className="App">
			<Logo />
			<MainSlider {...mainSliderProps} />
			{windowWidth > 1000 ? <DesktopLayout {...desktopLayoutProps} /> : <MobileLayout {...mobileLayoutProps} />}
		</div>
	);
}

export default App;
