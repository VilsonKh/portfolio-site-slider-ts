import "./DescriptionBar.scss";
import projectsConfig from "../projects-config.json";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useRef, useState } from "react";

const DescriptionBar = ({ slideIndex }: { slideIndex: any }) => {
	interface IProject {
		title: string;
		img: string;
		description: string;
		mainLink: string;
		githubLink: string;
		technologies: {
			preview: string;
			full: string;
		};
	}

	const [nextSlide, setNextSlide] = useState(false);

	const nodeRef = useRef(null);

	return (
		<div className="descriptionBar">
			{projectsConfig.map((project: any, index: number) => {
				if (index === slideIndex) {
					return (
						<div className={`descriptionBar__container opacity-anim ${nextSlide ? "move-out" : "move-in"}`} key={index} ref={nodeRef}>
							<p className="descriptionBar__text ">{project.description}</p>
							<div className="descriptionBar__buttonGroup">
								<a href={project.githubLink} className="descriptionBar__link">
									<img src="./assets/icon-github.svg" alt="" />
								</a>
								<a href={project.mainLink} className="descriptionBar__link">
									<img src="./assets/personalLink.svg" alt="" />
								</a>
							</div>
							<div className="descriptionBar__technologiesContainer" onClick={() => setNextSlide(true)}>
								<p className="descriptionBar__technologies">{project.technologies.preview}</p>
								<button className="descriptionBar__arrow">
									<img src="./assets/icon-arrow.svg" alt="" />
								</button>
							</div>
						</div>
					);
				}
				return null;
			})}
      <button><img src="./assets/icon-arrow.svg" alt="" /></button>
		</div>
	);
};

export default DescriptionBar;
