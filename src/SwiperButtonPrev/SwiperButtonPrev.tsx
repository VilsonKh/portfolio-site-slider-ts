import { useSwiper } from "swiper/react";

const SwiperButtonPrev = () => {
	const swiper = useSwiper();
	const onButtonClick = () => {
		swiper.slidePrev();
	};
	return (
		<button className="descriptionBar__arrowBack" onClick={onButtonClick}>
			<img src="./assets/arrow.svg" alt="" style={{transform: "rotate(90deg"}}/>
		</button>
	);
};

export default SwiperButtonPrev;
