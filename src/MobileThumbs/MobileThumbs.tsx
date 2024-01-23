import "./MobileThumbs.scss";
import projectsConfig from "../projects-config.json";
import { Swiper, SwiperSlide } from "swiper/react";

const MobileThumbs = () => {
	return (
		<div className="mobileThumbs">
			<div className="mobileThumbs__container">
				<Swiper className="mobileThumbs__swiper"
                slidesPerView={3}>
					{projectsConfig.map((project, index): JSX.Element => {
						return (
							<SwiperSlide data-index={index} key={index}>
								<div >
									<img src={project.img.link} alt={project.title} />
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
