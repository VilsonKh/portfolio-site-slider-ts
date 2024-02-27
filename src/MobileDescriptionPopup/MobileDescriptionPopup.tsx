import "./MobileDescriptionPopup.scss";
import projectsConfig from "../projects-config.json";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperButtonNext from "../SwiperButtonNext/SwiperButtonNext";
import SwiperButtonPrev from "../SwiperButtonPrev/SwiperButtonPrev";

import { useRef, useState } from "react";

const MobileDescriptionPopup = ({
	setIsDescriptionPopup,
	currentIndex,
}: {
	setIsDescriptionPopup: (value: boolean) => void;
	currentIndex: number;
}) => {
	function addAnimation() {
		const animatedElements = document.querySelectorAll(".mobileDescriptionPopup__techContainer");
		console.log(animatedElements)
		animatedElements.forEach((elem, i) => {
			setTimeout(() => {
				elem.classList.add("appearence");
			}, 200 + i * 100);
		});
	}

	function removeAnimation() {
		const animatedElements = document.querySelectorAll(".mobileDescriptionPopup__techContainer");
		animatedElements.forEach((elem) => {
			elem.classList.remove("appearence");
		});
	}

	return (
		<div className="mobileDescriptionPopup">
			<div
				className="mobileDescriptionPopup__close"
				onClick={() => {
					setIsDescriptionPopup(false);
					removeAnimation()
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
					<div
						className="mobileDescriptionPopup__arrowNext"
						onClick={addAnimation}
					>
						<SwiperButtonNext />
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="mobileDescriptionPopup__gridLayout">
						{projectsConfig.map((project, i) => {
							if (i === currentIndex) {
								return project.technologies.full.map((tech: any, i) => {
									return (
										<div className="mobileDescriptionPopup__techContainer" key={i}>
											<img
												className="mobileDescriptionPopup__techImg"
												src={tech.img}
												alt=""
											/>
											<p className="mobileDescriptionPopup__techText">{tech.title}</p>
										</div>
									);
								});
							}
							return undefined;
						})}
					</div>
					<div
						className="mobileDescriptionPopup__arrowPrev"
						onClick={removeAnimation}
					>
						<SwiperButtonPrev />
					</div>
				</SwiperSlide>
			</Swiper>
		</div>
	);
};

export default MobileDescriptionPopup;
