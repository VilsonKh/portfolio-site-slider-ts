import "./MobileThumbs.scss";
import projectsConfig from "../projects-config.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Controller } from "swiper/modules";
import { useState } from "react";

interface IMobileThumbs {
	mainSwiper: any;
	setMobileThumbsSwiper: (value: any) => void;
	isMobileThumbHide: boolean;
	setIsMobileThumbHide: (value: any) => void;
}

const MobileThumbs = ({ mainSwiper, setMobileThumbsSwiper, setIsMobileThumbHide, isMobileThumbHide }: IMobileThumbs) => {
	return (
		<div className={`mobileThumbs ${isMobileThumbHide ? "hide" : ""}`}>
			<div className="topTriangle"></div>
			<div className="bottomTriangle"></div>
			<div className="mobileThumbs__container">
				<Swiper
					className="mobileThumbs__swiper"
					slidesPerView={3}
					initialSlide={1}
					onSwiper={(swiper: any) => setMobileThumbsSwiper(swiper)}
					modules={[Controller]}
					controller={{ control: mainSwiper }}
					centeredSlides={true}
				>
					{projectsConfig.map((project, index): JSX.Element => {
						return (
							<SwiperSlide
								data-index={index}
								key={index}
							>
						<div className="mobileThumbs__slide-wrapper">
									<div className="mobileThumbs__slide-container">
										<img
											src={project.img.link}
											alt={project.title}
											className="mobileThumbs__img"
										/>
									</div>
						</div>
							</SwiperSlide>
						);
					})}
				</Swiper>
			</div>
			<button
				className="mobileThumbs__arrowDown"
				onClick={() => setIsMobileThumbHide(!isMobileThumbHide)}
			>
				<img
					src="./assets/arrow-down-icon.svg"
					alt="arrow-down"
				/>
			</button>
		</div>
	);
};

export default MobileThumbs;
