import { useSwiper } from "swiper/react";

const SwiperButtonPrev = () => {
	const swiper = useSwiper();
	const onButtonClick = () => {
		swiper.slidePrev();
	};
	return (
		<button className="descriptionBar__arrowBack" onClick={onButtonClick}>
			<img src="./assets/icon-arrow.svg" alt="" />
		</button>
	);
};

export default SwiperButtonPrev;
