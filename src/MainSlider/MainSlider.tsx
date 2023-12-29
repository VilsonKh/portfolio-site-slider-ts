import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Controller, Thumbs } from "swiper/modules";
import projectsConfig from "../projects-config.json";
import "swiper/css";
import "./MainSlider.scss";

const MainSlider = ({ thumbsSwiper, setMainSwiper }: { thumbsSwiper: any, setMainSwiper: any }) => {
	const sliderParams = {
		initialSlide: 1,
		modules: [Thumbs, Controller],
    onSwiper: setMainSwiper
	};
  // thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
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
