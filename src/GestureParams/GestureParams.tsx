import { useSpring, animated } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import React, { useEffect, useRef } from 'react'

const GestureParams = ({children}: {children: JSX.Element}) => {

  const [{ x, y, rotateX, rotateY, rotateZ, zoom, scale }, api] = useSpring(() => ({
		rotateX: 0,
		rotateY: 0,
		rotateZ: 0,
		scale: 1,
		zoom: 0,
		x: 0,
		y: 0,
		config: { mass: 1, tension: 450, friction: 40 },
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
			onDrag: ({ offset: [x, y] }) => {
				api.start({ x, y });
			},
			onPinch: ({ offset: [d, a] }) => api.start({ zoom: d, rotateZ: a }),
		},
		{
			drag: {
				target: ref,
				bounds: {
					left: window.screen.width - 1920,
					top: window.screen.height - 1080,
					right: 0,
					bottom: 0,
				},
				rubberband: true,
			},
			pinch: { target: ref, scaleBounds: { min: 0.1, max: 1.5 }, rubberband: true },
		}
	);
  return (
    <animated.div style={{x, y, rotateX, rotateY, zoom, scale}} {...bind()}>{children}</animated.div>
  )
}

export default GestureParams