import { animated, useSpring } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import React, { useEffect, useRef, useState } from "react";
import "./GestureParams.scss";

const GestureParams = ({ children, windowWidth }: { children: JSX.Element; windowWidth: number }) => {
	// @ts-ignore: Unreachable code error
	const [scaleNum, setScaleNum] = useState<any>(null);

	// @ts-ignore: Unreachable code error
	// const [{ origin, ...style }, set] = useSpring(() => ({
	// 	x: 0,
	// 	y: 0,
	// 	scale: 1,
	// 	rotateZ: 0,
	// }));

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
	// 			set({ x, y });
	// 		},
	// 		onPinch: ({ origin: [ox, oy], first, pinching, movement: [md], offset: [d, a], memo = [style.x.get(), style.y.get()], cancel }) => {
	// 			// movement - запоминает смещение после каждого жеста
	// 			// origin - позиция пальцев при жесте

	// 			if (first) {
	// 				// @ts-ignore: Unreachable code error
	// 				const { width, height, x, y } = ref.current.getBoundingClientRect();
	// 				const tx = (ox - (x + width / 2)) / style.scale.get();
	// 				const ty = (oy - (y + height / 2)) / style.scale.get();
	// 				memo = [...memo, tx, ty];
	// 			}
	// 			const ms = md / 20;
	// 			let x = memo[0] - ms * memo[2];
	// 			const y = memo[1] - ms * memo[3];
	// 			// if (x < -860) x = -860;
	// 			set({ scale: d, x: x, y: y });
	// 			setScaleNum(d);

	// 			return memo;
	// 		},
	// 	},
	// 	{
	// 		eventOptions: { passive: false },
	// 		target: ref,
	// 		drag: {
	// 			target: ref,
	// 			bounds: {
	// 				// left:  scaleNum < 1 && scaleNum !== null ? -1920 * scaleNum + 100 : -1300 ,
	// 				// @ts-ignore: Unreachable code error
	// 				// top: scaleNum < 1 && scaleNum !== null ? -1080 * scaleNum + 100 : -900,
	// 				// left: scaleNum ? (-1920 + window.screen.width) * scaleNum : -1920 + window.screen.width,
	// 				// top: scaleNum ? (-1080 + window.screen.height) * scaleNum : -1080 + window.screen.height,
	// 				// right: 0,
	// 				// bottom: scaleNum ? (1080 - window.screen.height) * scaleNum : 1080 - window.screen.height,
	// 			},
	// 			rubberband: 0.2,
	// 		},
	// 		pinch: {
	// 			target: ref,
	// 			rubberband: 0.5,
	// 			scaleBounds: { min: 0.25, max: 2.4 },
	// 			distanceBounds: {min: 0.25}
	// 		},
	// 	}
	// );

	// if (windowWidth > 1000) {
	// 	set.stop();
	// }

	const containerRef = useRef<HTMLImageElement>(null);
	const [crop, setCrop] = useState({ x: 0, y: 0, scale: 1 });
	// const bound = window.innerWidth / 2;
	const bound = 0

	useGesture(
		{
			onDrag: ({ offset: [dx, dy], dragging }) => {
				setCrop((crop) => ({ ...crop, x: dx, y: dy }));
				adjustOffset(dragging, bound);
			},
			onPinch: ({ memo, origin: [pinchOriginX, pinchOriginY], first, movement: [md], offset: [d], pinching }) => {
				//запоминает значения один раз, чтобы не пересчитывать их во время жеста
				memo ??= {
					bounds: containerRef.current?.getBoundingClientRect(),
					crop,
				};

				//находит середину изображения
				// @ts-ignore: Unreachable code error
				let transformOriginX = memo.bounds.x + memo.bounds.width / 2;
				// @ts-ignore: Unreachable code error
				let transformOriginY = memo.bounds.y + memo.bounds.height / 2;


				//находит расстояние между центром изображения и центром жеста. Делим на scale для повторного зума
				let displacementX = (transformOriginX - pinchOriginX);
				let displacementY = (transformOriginY - pinchOriginY) ;

				//находит расстояние до нового центра жеста
				let newDisplacementX = displacementX * md
				let newDisplacementY = displacementY * md

				let finalDisplacementX = newDisplacementX - displacementX
				let finalDisplacementY = newDisplacementY - displacementY

				console.log(memo.crop.scale)
				//предыдущий scale
				let initialOffsetDistance = (memo.crop.scale -1);
				let movementDistance = d - initialOffsetDistance;

				let x = memo.crop.x + (finalDisplacementX * movementDistance);
				let y = memo.crop.x + (finalDisplacementY * movementDistance);
				setCrop((crop) => ({
					...crop,
					scale: d,
					x: x,
					y: y,
				}));
				// if (!pinching) adjustOffset(pinching, bound);

				return memo;
			},
		},
		{
			drag: {
				from: () => [crop.x, crop.y],
			},
			pinch: {
				scaleBounds: { min: 1 },
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
