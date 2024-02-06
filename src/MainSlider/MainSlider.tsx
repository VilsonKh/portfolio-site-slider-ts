import { Swiper, SwiperSlide } from "swiper/react";
import { Controller } from "swiper/modules";
import projectsConfig from "../projects-config.json";
import "swiper/css";
import "./MainSlider.scss";
import { useGesture } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/web";
import { useEffect, useRef } from "react";

const MainSlider = ({
	thumbsSwiper,
	setMainSwiper,
	setCurrentIndex,
	windowWidth,
	currentIndex,
}: {
	isHide: boolean;
	thumbsSwiper: any;
	setMainSwiper: any;
	windowWidth: number;
	setCurrentIndex: (value: any) => void;
	mobileThumbsSwiper: any;
	currentIndex: number;
}) => {
	const sliderParams = {
		initialSlide: 1,
		modules: [Controller],
		onSwiper: setMainSwiper,
		onSlideChange: (swiper: any) => {
			setCurrentIndex(swiper.activeIndex);

			console.log("slide change");
		},
		allowSlideNext: windowWidth < 1000 ? false : true,
		allowSlidePrev: windowWidth < 1000 ? false : true,
		simulateTouch: false,
	};

	const [{ x, y, rotateX, rotateY, rotateZ, zoom, scale }, api] = useSpring(() => ({
		rotateX: 0,
		rotateY: 0,
		rotateZ: 0,
		scale: 1,
		zoom: 0,
		x: 0,
		y: 0,
		// config: { mass: 5, tension: 350, friction: 40 },
	}));

	console.log(api);
	const ref = useRef<HTMLImageElement>(null);

	useEffect(() => {
		const handler = (e: Event) => e.preventDefault();
		document.addEventListener("gesturestart", handler);
		document.addEventListener("gesturechange", handler);
		document.addEventListener("gestureend", handler);
		return () => {
			document.removeEventListener("gesturestart", handler);
			document.removeEventListener("gesturechange", handler);
			document.removeEventListener("gestureend", handler);
		};
	}, []);

	const bind = useGesture(
		{
			onDrag: ({ pinching, cancel, offset: [x, y] }) => {
				api.start({ x, y });
			},
			onPinch: ({ offset: [d, a] }) => api.start({ zoom: d, rotateZ: a }),
		},
		{
			drag: {
				target: ref,
				// bounds: {
				// 	left: window.screen.width - 1920,
				// 	top: window.screen.height - 1080,
				// 	right: 0,
				// 	bottom: 0,
				// },
				rubberband: true,
			},
			pinch: { target: ref, scaleBounds: { min: 0.1, max: 1.5 }, rubberband: true },
		}
	);
	return (
		<Swiper
			className="mainSlider"
			{...sliderParams}
			controller={{ control: thumbsSwiper }}
		>
			{projectsConfig.map((project, index): JSX.Element => {
				return (
					<SwiperSlide key={index}>
						<animated.img
							className="mainSlider__img"
							src={project.img.link}
							alt={project.title}
							// style={isHide || windowWidth < 1000 ? { transform: "translate(0)" } : { transform: `translate(${project.img.shift}%)` }}
							style={{ x, y, scale, zoom, rotateX, rotateY, rotateZ }}
							ref={ref}
							{...bind()}
						/>
					</SwiperSlide>
				);
			})}
		</Swiper>
	);
};

export default MainSlider;
