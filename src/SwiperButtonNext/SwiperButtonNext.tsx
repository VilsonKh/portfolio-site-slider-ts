import { useSwiper } from "swiper/react";

const SwiperButtonNext = () => {
	const swiper = useSwiper();
	const onButtonClick = () => {
		console.log("click");
		swiper.slideNext();
	};
	return (
		<button className="descriptionBar__arrow" onClick={onButtonClick}>
			<img src="./assets/icon-arrow.svg" alt="" />
		</button>
	);
};

export default SwiperButtonNext;
