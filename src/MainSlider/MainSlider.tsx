import { Swiper, SwiperSlide } from "swiper/react";
import { Controller, Thumbs } from "swiper/modules";
import projectsConfig from "../projects-config.json";
import "swiper/css";
import "./MainSlider.scss";

import { useSpring, animated } from "@react-spring/web";
import { createUseGesture, dragAction, pinchAction, useDrag } from "@use-gesture/react";
import { useEffect, useRef } from "react";

const MainSlider = ({
	thumbsSwiper,
	setMainSwiper,
	setCurrentIndex,
	isHide,
	windowWidth,
	mobileThumbsSwiper,
}: {
	isHide: boolean;
	thumbsSwiper: any;
	setMainSwiper: any;
	windowWidth: number;
	setCurrentIndex: (value: any) => void;
	mobileThumbsSwiper: any;
}) => {
	const sliderParams = {
		initialSlide: 1,
		modules: [Thumbs, Controller],
		onSwiper: setMainSwiper,
		onSlideChange: (swiper: any) => setCurrentIndex(swiper.activeIndex),
		allowSlideNext: windowWidth < 1000 ? false : true,
		allowSlidePrev: windowWidth < 1000 ? false : true,
		simulateTouch: false,
	};

	const useGesture = createUseGesture([dragAction, pinchAction]);

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
	});

	const [{ x, y }, api] = useSpring(() => ({
		x: 0,
		y: 0,
		scale: 1,
		rotateZ: 0,
	}));
	const ref = useRef<HTMLImageElement>(null);

	// useGesture(
	//   {
	//     // onHover: ({ active, event }) => console.log('hover', event, active),
	//     // onMove: ({ event }) => console.log('move', event),
	//     onDrag: ({ pinching, cancel, offset: [x, y], ...rest }) => {
	//       if (pinching) return cancel()
	// 			console.log("драг")
	//       api.start({ x, y })
	//     },
	//     onPinch: ({ origin: [ox, oy], first, movement: [ms], offset: [s, a], memo }) => {
	//       if (first) {
	//         const { width, height, x, y } = ref.current!.getBoundingClientRect()
	//         const tx = ox - (x + width / 2)
	//         const ty = oy - (y + height / 2)
	//         memo = [style.x.get(), style.y.get(), tx, ty]
	//       }

	//       const x = memo[0] - (ms - 1) * memo[2]
	//       const y = memo[1] - (ms - 1) * memo[3]
	//       api.start({ scale: s, rotateZ: a, x, y })
	//       return memo
	//     },
	//   },
	//   {
	//     target: ref,
	//     drag: { from: () => [style.x.get(), style.y.get()] },
	//     pinch: { scaleBounds: { min: 0.5, max: 2 }, rubberband: true },
	//   }
	// )

	const bind = useDrag(({ offset: [x, y] }) => {
		api.start({ x, y });
		console.log("drag");
	});

	return (
		<Swiper
			className="mainSlider"
			{...sliderParams}
			controller={thumbsSwiper ? { control: thumbsSwiper } : undefined}
		>
			{projectsConfig.map((project, index): JSX.Element => {
				return (
					<SwiperSlide key={index}>
						<animated.img
							className="mainSlider__img"
							src={project.img.link}
							alt={project.title}
							// style={isHide || windowWidth < 1000 ? { transform: "translate(0)" } : { transform: `translate(${project.img.shift}%)` }}
							style={{ x, y }}
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
