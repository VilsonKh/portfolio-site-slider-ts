import { Swiper, SwiperSlide } from "swiper/react";
import projectsConfig from "../projects-config.json";
import { Controller } from "swiper/modules";
import "./ThumbsSlider.scss";

const ThumbsSlider = ({ setThumbsSwiper, mainSwiper }: { setThumbsSwiper: () => void; mainSwiper: any }) => {
	const sliderParams = {
		slidesPerView: 3,
		// spaceBetween: 50,
		initialSlide: 1,
		centeredSlides: true,
		watchSlidesProgress: true,
		onSwiper: setThumbsSwiper,
		modules: [Controller],
		freeMode: false,
	};

	function setBeforePrevAfterNext(swiper: any) {
		const currentIndex = swiper.activeIndex;
		const totalSlides = swiper.slides.length - 1;
		const prev = swiper.slides[currentIndex - 1];
		const next = swiper.slides[currentIndex + 1];

		document.querySelectorAll(".swiper-slide-before-prev").forEach((element: any) => {
			element.classList.remove("swiper-slide-before-prev");
		});

		document.querySelectorAll(".swiper-slide-after-next").forEach((element: any) => {
			element.classList.remove("swiper-slide-after-next");
		});

		if (currentIndex === 0) {
			console.log("первый слайд");
			document.querySelector("div[data-index='2'")?.classList.add("swiper-slide-after-next");
		} else if (currentIndex === totalSlides) {
			swiper.slides[currentIndex - 2].classList.add("swiper-slide-before-prev");
		} else {
			if (prev.previousElementSibling) {
				prev.previousElementSibling.classList.add("swiper-slide-before-prev");
			}

			if (next.nextElementSibling) {
				next.nextElementSibling.classList.add("swiper-slide-after-next");
			}
		}
	}

	return (
		<Swiper
			className="thumbsSlider"
			{...sliderParams}
			direction="vertical"
			controller={mainSwiper ? { control: mainSwiper } : undefined}
			onActiveIndexChange={(swiper: any) => setBeforePrevAfterNext(swiper)}
		>
			{projectsConfig.map((project, index): JSX.Element => {
				return (
					<SwiperSlide data-index={index} key={index}>
						<div className="thumbsSlider__thumb">
							<img src={project.img.link} alt={project.title} />
						</div>
					</SwiperSlide>
				);
			})}
		</Swiper>
	);
};

export default ThumbsSlider;
