import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Controller, Thumbs } from "swiper/modules";
import projectsConfig from "../projects-config.json";
import "swiper/css";
import "./MainSlider.scss";

const MainSlider = ({ thumbsSwiper, setMainSwiper, setCurrentIndex }: { thumbsSwiper: any, setMainSwiper: any, setCurrentIndex: (value: any) => void }) => {
	const sliderParams = {
		initialSlide: 1,
		modules: [Thumbs, Controller],
    onSwiper: setMainSwiper,
		onSlideChange: (swiper: any)=> setCurrentIndex(swiper.activeIndex)

	};

	return (
		<Swiper className="mainSlider" {...sliderParams}  controller={thumbsSwiper ? {control: thumbsSwiper} : undefined}>
			{projectsConfig.map((project): JSX.Element => {
				return (
					<SwiperSlide>
						<img src={project.img} alt={project.title} />
					</SwiperSlide>
				);
			})}
		</Swiper>
	);
};

export default MainSlider;
