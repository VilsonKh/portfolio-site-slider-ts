import "./MobileDescriptionPopup.scss";
import projectsConfig from "../projects-config.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import SwiperButtonNext from "../SwiperButtonNext/SwiperButtonNext";
import SwiperButtonPrev from "../SwiperButtonPrev/SwiperButtonPrev";

const MobileDescriptionPopup = ({
	setIsDescriptionPopup,
	currentIndex,
}: {
	setIsDescriptionPopup: (value: boolean) => void;
	currentIndex: number;
}) => {
	return (
		<div className="mobileDescriptionPopup">
			<div
				className="mobileDescriptionPopup__close"
				onClick={() => {
					setIsDescriptionPopup(false);
				}}
			></div>
			<Swiper>
				<SwiperSlide>
					<div className="mobileDescriptionPopup__container">
						{projectsConfig.map((project: any, i) => {
							if (i === currentIndex) {
								return (
									<>
										<p className="mobileDescriptionPopup__text">{project.description}</p>
										<div className="mobileDescriptionPopup__links">
											<a
												href={project.githubLink}
												className="mobileDescriptionPopup__github"
											>
												<img
													src="./assets/icon-github.svg"
													alt=""
												/>
												<p className="">Github</p>
											</a>
											<a
												href={project.mainLink}
												className="mobileDescriptionPopup__website"
											>
												<img
													src="./assets/personalLink.svg"
													alt=""
												/>
												<p>visit website</p>
											</a>
										</div>
									</>
								);
							}
							return undefined;
						})}
					</div>
					<div className="mobileDescriptionPopup__arrowNext">
						<SwiperButtonNext />
					</div>
				</SwiperSlide>
				<SwiperSlide>
					{/* НЕ РЕНДЕРИТСЯ ПОСЛЕ ЭТОЙ СТРОЧКИ */}
					<div className="mobileDescriptionPopup__gridLayout">
						{projectsConfig.map((project, i) => {
							if (i === currentIndex) {
								project.technologies.full.map((tech: any) => {
									return (
										<div className="mobileDescriptionPopup__techContainer">
											<img
												src={tech.img}
												alt=""
											/>
											<p className="mobileDescriptionPopup__techText">{tech.title}</p>
										</div>
									);
								});
							}
							return undefined
						})}
					</div>
					<div className="mobileDescriptionPopup__arrowPrev">
						<SwiperButtonPrev />
					</div>
				</SwiperSlide>
			</Swiper>
			{/* <div className="mobileDescriptionPopup__arrow" onClick={descriptionSwiper.nextSlide()}>
				<img
					src="./assets/arrow-down-icon.svg"
					alt="arrow"
				/>
			</div> */}
		</div>
	);
};

export default MobileDescriptionPopup;
