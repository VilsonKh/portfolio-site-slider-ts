import { animated, useSpring } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import React, { useEffect, useRef, useState } from "react";
import "./GestureParams.scss";

const GestureParams = ({ children, windowWidth }: { children: JSX.Element; windowWidth: number }) => {
	const containerRef = useRef<HTMLImageElement>(null);
	const [crop, setCrop] = useState({ x: 0, y: 0, scale: 1 });
	const bound = 0;

			// @ts-ignore: Unreachable code error
	const [{ origin, ...style }, set] = useSpring(() => ({
		x: 0,
		y: 0,
		scale: 1,
		rotateZ: 0,
	}));

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
			onDrag: ({ pinching, cancel, offset: [dx, dy], dragging }) => {
				setCrop((crop) => ({ ...crop, x: dx, y: dy }));
				if (pinching) {
					return cancel();
				}
				adjustOffset(dragging, bound);
			},
			onPinch: ({ memo, origin: [pinchOriginX, pinchOriginY], first, movement: [md], offset: [d], pinching }) => {
				if (first) {
					// @ts-ignore: Unreachable code error
					const { width, height, x, y } = containerRef.current.getBoundingClientRect();
					const tx = pinchOriginX - (x + width / 2);
					const ty = pinchOriginY - (y + height / 2);
					memo = [crop.x, crop.y, tx, ty];
				}

				const x = memo[0] - (md - 1) * memo[2];
				const y = memo[1] - (md - 1) * memo[3];

				setCrop((crop) => ({
					...crop,
					scale: d,
					x: x,
					y: y,
				}));
				if (!pinching) adjustOffset(pinching, bound);

				return memo;
			},
		},
		{
			drag: {
				from: () => [crop.x, crop.y],
			},
			pinch: {
				scaleBounds: { min: 0.7 },
			},
			target: containerRef,
			eventOptions: { passive: false },
		}
	);

	function adjustOffset(moving: any, bound: any) {
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

		if (!moving) {
			if (containerBounds.left > bound) {
				setCrop((crop) => ({ ...crop, x: widthOverhang }));
			} else if (containerBounds.right < window.screen.width - bound) {
				setCrop((crop) => ({ ...crop, x: -(containerBounds.width - window.screen.width) + widthOverhang }));
			}

			if (containerBounds.top > bound) {
				setCrop((crop) => ({ ...crop, y: heightOverhang }));
			} else if (containerBounds.bottom < window.innerHeight - bound) {
				setCrop((crop) => ({ ...crop, y: -(containerBounds.height - window.innerHeight) + heightOverhang }));
			}
		}
	}

	return (
		<div
			// style={windowWidth < 1000 ? style : undefined}
			// @ts-ignore: Unreachable code error
			className="draggable"
			style={{
				left: crop.x,
				top: crop.y,
				transform: `scale(${crop.scale})`,
			}}
			ref={containerRef}
		>
			{children}
		</div>
	);
};

export default GestureParams;
