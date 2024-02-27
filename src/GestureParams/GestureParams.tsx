import { useSpring, animated } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import React, { useEffect, useRef } from 'react'

const GestureParams = ({children, windowWidth}: {children: JSX.Element, windowWidth: number}) => {

  const [{ x, y, rotateX, rotateY, zoom, scale }, api] = useSpring(() => ({
		rotateX: 0,
		rotateY: 0,
		rotateZ: 0,
		scale: 1,
		zoom: 0,
		x: 0,
		y: 0,
		config: { mass: 1, tension: 450, friction: 40 },
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



	let bind = useGesture(
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

	if (windowWidth > 1000) {
		api.stop()

	}
  return (
    <animated.div style={windowWidth < 1000 ? {x, y, rotateX, rotateY, zoom, scale} : undefined} {...bind()}>{children}</animated.div>
  )
}

export default GestureParams