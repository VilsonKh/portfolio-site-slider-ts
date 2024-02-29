import { animated, useSpring } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import React, { useEffect, useRef } from "react";

const GestureParams = ({ children, windowWidth }: { children: JSX.Element; windowWidth: number }) => {
	// @ts-ignore: Unreachable code error
	const [{ origin, ...style }, set] = useSpring(() => ({
		x: 0,
		y: 0,
		scale: 1,
		rotateZ: 0,
	}));

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

	// let bind = useGesture(
	// 	{
	// 		onDrag: ({ offset: [x, y] }) => {
	// 			api.start({ x, y });
	// 		},

	// 		onPinch: ({ offset: [d, a], lastOffset: [x, y] }) => api.start({ zoom: d, rotateZ: a, x: x, y: y }),
	// 	},
	// 	{
	// 		drag: {
	// 			target: ref,

	// 			bounds: {
	// 				left: window.screen.width - 1920,
	// 				top: window.screen.height - 1080,
	// 				right: 0,
	// 				bottom: 0,
	// 			},
	// 			rubberband: true,
	// 		},
	// 		pinch: { target: ref, scaleBounds: { min: 0.1, max: 1.5 }, rubberband: true },
	// 	}
	// );

	let bind = useGesture(
		{
			onDrag: ({ offset: [x, y] }) => {
				console.log(x, y);
				let ox = window.screen.width - 1920;
				let oy = window.screen.height - 1080;

				set({ x, y });
			},
			onPinch: ({ origin: [ox, oy], first, pinching, movement: [md], offset: [d, a], memo = [style.x.get(), style.y.get()] }) => {
				if (first) {
					// @ts-ignore: Unreachable code error
					const { width, height, x, y } = ref.current.getBoundingClientRect();
					console.log(style.scale.get);
					const tx = (ox - (x + width / 2)) / style.scale.get();
					const ty = (oy - (y + height / 2)) / style.scale.get();
					memo = [...memo, tx, ty];
				}
				const ms = md / 20;
				const x = memo[0] - ms * memo[2];
				const y = memo[1] - ms * memo[3];
				let scaleBound = function () {
					if (d / 2 >= 1.2) {
						return 1.2;
					} else if (d / 2 <= 0.7) {
						return 0.7;
					}
				};
				set({ scale: scaleBound(), x: x, y: y });
				return memo;
			},
		},
		{
			bounds: {
				left: window.screen.width - 1920,
				top: window.screen.height - 1080,
				// left: 0,
				// top: 0,
				right: 0,
				bottom: 0,
			},
			target: ref,
			eventOptions: { passive: false },
			// drag: { from: () => [style.x.get(), style.y.get()] },
		}
	);

	// if (windowWidth > 1000) {
	// 	api.stop();
	// }
	return (
		<animated.div
			style={windowWidth < 1000 ? style : undefined}
			// @ts-ignore: Unreachable code error
			{...bind}
			ref={ref}
		>
			{children}
		</animated.div>
	);
};

export default GestureParams;
