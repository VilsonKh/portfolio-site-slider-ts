import { Swiper, SwiperSlide } from "swiper/react";
import { Controller } from "swiper/modules";
import projectsConfig from "../projects-config.json";
import "swiper/css";
import "./MainSlider.scss";
import GestureParams from "../GestureParams/GestureParams";

const MainSlider = ({
	thumbsSwiper,
	setMainSwiper,
	setCurrentIndex,
	windowWidth,
	currentIndex,
	isHide,
	setIsMobileThumbHide,
}: {
	isHide: boolean;
	thumbsSwiper: any;
	setMainSwiper: any;
	windowWidth: number;
	setCurrentIndex: (value: any) => void;
	mobileThumbsSwiper: any;
	currentIndex: number;
	setIsMobileThumbHide: (value: boolean) => void;
}) => {
	const sliderParams = {
		initialSlide: 1,
		modules: [Controller],
		onSwiper: setMainSwiper,
		onSlideChange: (swiper: any) => {
			setCurrentIndex(swiper.activeIndex);
		},
		allowSlideNext: windowWidth < 1000 ? false : true,
		allowSlidePrev: windowWidth < 1000 ? false : true,
		simulateTouch: true,
	};

	return (
		<Swiper
			className="mainSlider"
			{...sliderParams}
			controller={{ control: thumbsSwiper }}
		>
			{projectsConfig.map((project, index): JSX.Element => {
				return (
					<SwiperSlide key={index}>
						<GestureParams windowWidth={windowWidth}>
							<img
								className="mainSlider__img"
								onClick={() => setIsMobileThumbHide(true)}
								src={project.img.link}
								alt={project.title}
								style={
									isHide || windowWidth < 1000 ? { transform: "translate(0)" } : { transform: `translate(${project.img.shift}%)` }
								}
							/>
						</GestureParams>
					</SwiperSlide>
				);
			})}
		</Swiper>
	);
};

export default MainSlider;
