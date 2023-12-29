import { useState } from "react";
import Logo from "./Logo/Logo";
import MainSlider from "./MainSlider/MainSlider";
import NavMenu from "./NavMenu/NavMenu";
function App() {

  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [mainSwiper, setMainSwiper] = useState(null)
  

	return (
		<div className="App">
			<Logo />
			<MainSlider  thumbsSwiper={thumbsSwiper} setMainSwiper={setMainSwiper}/>
      <NavMenu  mainSwiper={mainSwiper} setThumbsSwiper={setThumbsSwiper}/>
		</div>
	);
}

export default App;
