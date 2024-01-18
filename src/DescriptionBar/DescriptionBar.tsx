import "./DescriptionBar.scss";
import projectsConfig from "../projects-config.json";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperButtonNext from "../SwiperButtonNext/SwiperButtonNext";
import SwiperButtonPrev from "../SwiperButtonPrev/SwiperButtonPrev";

const DescriptionBar = ({ slideIndex, isHide}: { slideIndex: any, isHide: boolean }) => {
  
	return (
		<div className={`descriptionBar${isHide ? " hide" : ''}`}>
			{projectsConfig.map((project: any, index: number) => {
				if (index === slideIndex) {
					return (
						<div className={`descriptionBar__container opacity-anim`} key={index}>
							<Swiper allowTouchMove={false}>
								<SwiperSlide>
									<p className="descriptionBar__text ">{project.description}</p>
									<div className="descriptionBar__footer">
										<div className="descriptionBar__technologiesContainer">
											<p className="descriptionBar__technologies">{project.technologies.preview}</p>
											<SwiperButtonNext />
										</div>
										<div className="descriptionBar__buttonGroup">
											<a href={project.githubLink} className="descriptionBar__link">
												<img src="./assets/icon-github.svg" alt="" />
											</a>
											<a href={project.mainLink} className="descriptionBar__link">
												<img src="./assets/personalLink.svg" alt="" />
											</a>
										</div>
									</div>
								</SwiperSlide>
								<SwiperSlide>
									<div className="descriptionBar__technologiesContainer">
										<SwiperButtonPrev />

										<div className="descriptionBar__technologiesGrid">
											{project.technologies.full.map((tech: any) => {
												return (
													<div className="descriptionBar__techItem">
														<p className="descriptionBar__techTitle">{tech.title}</p>
                            <img className="descriptionBar__techImg" src={tech.img} alt="" />
													</div>
												);
											})}
										</div>
									</div>
								</SwiperSlide>
							</Swiper>
						</div>
					);
				}
				return null;
			})}
			<button>
				<img src="./assets/icon-arrow.svg" alt="" />
			</button>
		</div>
	);
};

export default DescriptionBar;
