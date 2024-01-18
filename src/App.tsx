import { useState } from "react";
import Logo from "./Logo/Logo";
import MainSlider from "./MainSlider/MainSlider";
import NavMenu from "./NavMenu/NavMenu";
import DescriptionBar from "./DescriptionBar/DescriptionBar";
import HideBarButton from "./HideBarButton/HideBarButton";
function App() {

  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [mainSwiper, setMainSwiper] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(1)
	const [isHide, setIsHide] = useState(false)


	return (
		<div className="App">
			<Logo />
			<HideBarButton isHide={isHide} setIsHide={setIsHide}/>
			<MainSlider isHide={isHide}  setCurrentIndex={setCurrentIndex}  thumbsSwiper={thumbsSwiper} setMainSwiper={setMainSwiper}/>
      <NavMenu isHide={isHide} mainSwiper={mainSwiper} setThumbsSwiper={setThumbsSwiper}/>
			<DescriptionBar isHide={isHide} slideIndex={currentIndex}/>
		</div>
	);
}

export default App;