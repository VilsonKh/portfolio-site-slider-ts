import "./MobileThumbs.scss";
import projectsConfig from "../projects-config.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Controller } from "swiper/modules";

const MobileThumbs = ({ mainSwiper, setMobileThumbsSwiper }: { mainSwiper: any; setMobileThumbsSwiper: (value: any) => void }) => {
	return (
		<div className="mobileThumbs">
			<div className="topTriangle"></div>
			<div className="bottomTriangle"></div>
			<div className="mobileThumbs__container">
				<Swiper
					className="mobileThumbs__swiper"
					slidesPerView={3}
					initialSlide={1}
					onSwiper={(swiper: any) => setMobileThumbsSwiper(swiper)}
					modules={[Controller]}
					controller={mainSwiper ? { control: mainSwiper } : undefined}
					centeredSlides={true}
				>
					{projectsConfig.map((project, index): JSX.Element => {
						return (
							<SwiperSlide
								data-index={index}
								key={index}
							>
								<div>
									<img
										src={project.img.link}
										alt={project.title}
									/>
								</div>
							</SwiperSlide>
						);
					})}
				</Swiper>
			</div>
		</div>
	);
};

export default MobileThumbs;
