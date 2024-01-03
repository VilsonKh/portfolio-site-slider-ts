import { useState } from "react";
import Logo from "./Logo/Logo";
import MainSlider from "./MainSlider/MainSlider";
import NavMenu from "./NavMenu/NavMenu";
import DescriptionBar from "./DescriptionBar/DescriptionBar";
function App() {

  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [mainSwiper, setMainSwiper] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(1)



	return (
		<div className="App">
			<Logo />
			<MainSlider setCurrentIndex={setCurrentIndex}  thumbsSwiper={thumbsSwiper} setMainSwiper={setMainSwiper}/>
      <NavMenu  mainSwiper={mainSwiper} setThumbsSwiper={setThumbsSwiper}/>
			<DescriptionBar slideIndex={currentIndex}/>
		</div>
	);
}

export default App;