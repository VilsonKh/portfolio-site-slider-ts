import { useSwiper } from "swiper/react";

const SwiperButtonNext = ({children}: {children: JSX.Element}) => {
	const swiper = useSwiper();
  const onButtonClick = () => {
    console.log('click')
    swiper.slideNext()
  }
	return (
		<button className="descriptionBar__arrow" onClick={onButtonClick}>
			{children}
		</button>
	);
};

export default SwiperButtonNext;
