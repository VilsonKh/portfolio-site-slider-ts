import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Controller, Thumbs } from "swiper/modules";
import projectsConfig from "../projects-config.json";
import "swiper/css";
import "./MainSlider.scss";

const MainSlider = ({ thumbsSwiper, setMainSwiper, setCurrentIndex, isHide }: {isHide: boolean, thumbsSwiper: any; setMainSwiper: any; setCurrentIndex: (value: any) => void }) => {
	const sliderParams = {
		initialSlide: 1,
		modules: [Thumbs, Controller],
		onSwiper: setMainSwiper,
		onSlideChange: (swiper: any) => setCurrentIndex(swiper.activeIndex),
	};

	return (
		<Swiper className="mainSlider" {...sliderParams} controller={thumbsSwiper ? { control: thumbsSwiper } : undefined}>
			{projectsConfig.map((project, index): JSX.Element => {
				return (
					<SwiperSlide key={index}>
						<img className="mainSlider__img" src={project.img.link} alt={project.title} style={isHide ? {transform: "translate(0)"} : { transform: `translate(${project.img.shift}%)` }} />
					</SwiperSlide>
				);
			})}
		</Swiper>
	);
};

export default MainSlider;
