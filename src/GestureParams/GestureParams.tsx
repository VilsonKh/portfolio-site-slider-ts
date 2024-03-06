import { animated, useSpring } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import React, { useEffect, useRef, useState } from "react";
import "./GestureParams.scss";

const GestureParams = ({ children, windowWidth }: { children: JSX.Element; windowWidth: number }) => {
	const containerRef = useRef<HTMLImageElement>(null);
	// const [crop, setCrop] = useState({ x: 0, y: 0, scale: 1 });
	const bound = 0;

	// @ts-ignore: Unreachable code error
	const [{ ...style }, set] = useSpring(() => ({
		x: 0,
		y: 0,
		scale: 1,
		rotateZ: 0,
	}));



	const adaptiveBounds = {
		right: 0,
		bottom: 0,
		left: -(window.screen.height * 1.77 * style.scale.get() - window.screen.width) ,
		top: 0
	// @ts-ignore: Unreachable code error

	};

	console.log(adaptiveBounds)

	const [rects, setRects] = useState();
		// @ts-ignore: Unreachable code error

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
			onDrag: ({ pinching, cancel, offset: [x, y], dragging }) => {
				// @ts-ignore: Unreachable code error
				set.start({ x, y });
				if (pinching) {
					return cancel();
				}
				// @ts-ignore: Unreachable code error
				setRects(containerRef.current.getBoundingClientRect());
				// adjustOffset(dragging, bound);
			},
			onPinch: ({ memo, origin: [pinchOriginX, pinchOriginY], first, movement: [md], offset: [d, a], pinching }) => {
				if (first) {
					// @ts-ignore: Unreachable code error
					const { width, height, x, y } = containerRef.current.getBoundingClientRect();
					const tx = pinchOriginX - (x + width / 2);
					const ty = pinchOriginY - (y + height / 2);
					memo = [style.x.get(), style.y.get(), tx, ty];
				}

				const x = memo[0] - (md - 1) * memo[2];
				const y = memo[1] - (md - 1) * memo[3];

				set.start({ scale: d, rotateZ: a, x, y });
				// if (!pinching) adjustOffset(pinching, bound);
				// @ts-ignore: Unreachable code error
				setRects(containerRef.current.getBoundingClientRect());
				return memo;
			},
		},
		{
			target: containerRef,
			eventOptions: { passive: false },

			drag: {
				target: containerRef,
				from: () => [style.x.get(), style.y.get()],
				// @ts-ignore: Unreachable code error
				bounds: adaptiveBounds,
				rubberband: 0.2,
			},
			pinch: {
				scaleBounds: { min: 1},
				rubberband: 0.2,
			},
		}
	);

	console.log(rects);

	function adjustOffset(bound: any) {
		// @ts-ignore: Unreachable code error
		let containerBounds = containerRef.current.getBoundingClientRect();
		// @ts-ignore: Unreachable code error
		let originalWidth = containerRef.current.clientWidth;
		// @ts-ignore: Unreachable code error
		let widthOverhang = (containerBounds.width - originalWidth) / 2;
		// @ts-ignore: Unreachable code error
		let originalHeight = containerRef.current.clientHeight;
		// @ts-ignore: Unreachable code error
		let heightOverhang = (containerBounds.height - originalHeight) / 2;

		const params = { x: null, y: null };

		if (containerBounds.left > bound) {
			// @ts-ignore: Unreachable code error
			params.x = widthOverhang;
		} else if (containerBounds.right < window.screen.width - bound) {
			// @ts-ignore: Unreachable code error
			params.x = -(containerBounds.width - window.screen.width) + widthOverhang;
		}

		if (containerBounds.top > bound) {
			// @ts-ignore: Unreachable code error
			params.y = heightOverhang;
		} else if (containerBounds.bottom < window.innerHeight - bound) {
			// @ts-ignore: Unreachable code error
			params.y = -(containerBounds.height - window.innerHeight);
		}

		return params;
	}

	return (
		<animated.div
			// style={windowWidth < 1000 ? style : undefined}
			className="draggable"
			// @ts-ignore: Unreachable code error
			style={style}
			ref={containerRef}
		>
			{children}
		</animated.div>
	);
};

export default GestureParams;
