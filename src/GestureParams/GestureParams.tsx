import { animated, useSpring } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import React, { useEffect, useRef, useState } from "react";
import { useWindowSize } from "@react-hook/window-size";
import "./GestureParams.scss";

const GestureParams = ({ children, windowWidth }: { children: JSX.Element; windowWidth: number }) => {
	const containerRef = useRef<HTMLImageElement>(null);

	// @ts-ignore: Unreachable code error
	const [{ ...style }, set] = useSpring(() => ({
		x: 0,
		y: 0,
		scale: 1,
		rotateZ: 0,
	}));

	const [width, height] = useWindowSize()

console.log(height)

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

	useGesture(
		{
			onDrag: ({ first, pinching, cancel, offset: [x, y], dragging }) => {
				set.start({ x, y });
				// @ts-ignore: Unreachable code error
				if (pinching) {
					return cancel();
				}
			},
			onPinch: ({ memo, origin: [pinchOriginX, pinchOriginY], first, movement: [md], offset: [d, a], pinching, cancel }) => {
				if (first) {
					// @ts-ignore: Unreachable code error
					const { width, height, x, y } = containerRef.current.getBoundingClientRect();
					const tx = pinchOriginX - (x + width / 2);
					const ty = pinchOriginY - (y + height / 2);
					memo = [style.x.get(), style.y.get(), tx, ty];
				}

				const x = memo[0] - (md - 1) * memo[2];
				const y = memo[1] - (md - 1) * memo[3];

				set.start({ scale: d, x, y });
				return memo;
			},
		},
		{
			target: containerRef,
			eventOptions: { passive: false },

			drag: {
				target: containerRef,
				from: () => [style.x.get(), style.y.get()],
				bounds: (arg) => (
					{
					// @ts-ignore: Unreachable code error
					right: (arg?.target.getBoundingClientRect().width - arg?.target.clientWidth) / 2,
					left:
					// @ts-ignore: Unreachable code error
						-(arg?.target.getBoundingClientRect().width - width) +
						// @ts-ignore: Unreachable code error
						((arg?.target.getBoundingClientRect().width - arg?.target.clientWidth) / 2),
					// @ts-ignore: Unreachable code error
					top: -(arg?.target.getBoundingClientRect().height - height) +
					// @ts-ignore: Unreachable code error
					(arg?.target.getBoundingClientRect().height - arg?.target.clientHeight) / 2 ,
					// @ts-ignore: Unreachable code error
					bottom:
					// @ts-ignore: Unreachable code error
					(arg?.target.getBoundingClientRect().height - arg?.target.clientHeight) / 2
				,
				}),
				rubberband: 0.2,
			},
			pinch: {
				scaleBounds: { min: 1 , max: 2},
				rubberband: 0.2,
			},
		}
	);

	console.log(window.screen.height)

	return (
		<animated.div
			style={windowWidth < 1000 ? style : undefined}
			className="draggable"
			ref={containerRef}
		>
			{children}
		</animated.div>
	);
};

export default GestureParams;
