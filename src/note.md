
	// @ts-ignore: Unreachable code error
	// const [{ origin, ...style }, set] = useSpring(() => ({
	// 	x: 0,
	// 	y: 0,
	// 	scale: 1,
	// 	rotateZ: 0,
	// }));

	// useEffect(() => {
	// 	const handler = (e: Event) => e.preventDefault();
	// 	document.addEventListener("gesturestart", handler);
	// 	document.addEventListener("gesturechange", handler);
	// 	document.addEventListener("gestureend", handler);
	// 	return () => {
	// 		document.removeEventListener("gesturestart", handler);
	// 		document.removeEventListener("gesturechange", handler);
	// 		document.removeEventListener("gestureend", handler);
	// 	};
	// }, []);


// //запоминает значения один раз, чтобы не пересчитывать их во время жеста
				// memo ??= {
				// 	bounds: containerRef.current?.getBoundingClientRect(),
				// 	crop,
				// };


				// // находит середину изображения
				// // @ts-ignore: Unreachable code error
				// let transformOriginX = memo.bounds.x + memo.bounds.width / 2;
				// // @ts-ignore: Unreachable code error
				// let transformOriginY = memo.bounds.y + memo.bounds.height / 2;

				// //находит расстояние между центром изображения и центром жеста. Делим на scale для повторного зума
				// let displacementX = transformOriginX - pinchOriginX;
				// let displacementY = transformOriginY - pinchOriginY;

				// //находит расстояние до нового центра жеста
				// let newDisplacementX = (displacementX * md) / 100;
				// let newDisplacementY = (displacementY * md) / 100;

				// let finalDisplacementX = newDisplacementX - displacementX;
				// let finalDisplacementY = newDisplacementY - displacementY;

				// //предыдущий scale
				// let initialOffsetDistance = memo.crop.scale - 1;
				// let movementDistance = md - initialOffsetDistance;

				// let x = memo.crop.x + finalDisplacementX * movementDistance;
				// let y = memo.crop.y + finalDisplacementY * movementDistance;







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