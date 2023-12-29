import { Swiper, SwiperSlide } from "swiper/react";
import projectsConfig from "../projects-config.json";
import { Controller } from "swiper/modules";
import "./ThumbsSlider.scss";

const ThumbsSlider = ({ setThumbsSwiper, mainSwiper }: { setThumbsSwiper: () => void; mainSwiper: any }) => {
	const sliderParams = {
		slidesPerView: 4,
		initialSlide: 1,
		centeredSlides: true,
		watchSlidesProgress: true,
		onSwiper: setThumbsSwiper,
		modules: [Controller],
		freeMode: false,
	};
	// (mainSwiper?.slides[mainSwiper?.activeIndex].classList.add('active'))

	return (
		<Swiper
			className="thumbsSlider"
			{...sliderParams}
			direction="vertical"
			controller={mainSwiper ? { control: mainSwiper } : undefined}
			onSlideChangeTransitionStart={function (swiper: any) {
				const currentIndex = swiper.activeIndex;
				const totalSlides = swiper.slides.length - 1;
				const prev = swiper.slides[currentIndex - 1];
				const next = swiper.slides[currentIndex + 1];

				if (currentIndex === 1) {
					swiper.slides[swiper.activeIndex + 2].classList.add("swiper-slide-after-next");
				} else if (currentIndex === totalSlides) {
					swiper.slides[swiper.activeIndex - 2].classList.add("swiper-slide-before-prev");
				} else {
					swiper.el.querySelectorAll(".swiper-slide-before-prev").forEach((element: any) => {
						element.classList.remove("swiper-slide-before-prev");
					});

					swiper.el.querySelectorAll(".swiper-slide-after-next").forEach((element: any) => {
						element.classList.remove("swiper-slide-after-next");
					});

					if (prev.previousElementSibling) {
						prev.previousElementSibling.classList.add("swiper-slide-before-prev");
					}

					if (next.nextElementSibling) {
						console.log(next.nextElementSibling)
						next.nextElementSibling.classList.add("swiper-slide-after-next");
					}
				}
			}}
		>
			{projectsConfig.map((project, index): JSX.Element => {
				return (
					<SwiperSlide data-index={index}>
						<img src={project.img} alt={project.title} />
					</SwiperSlide>
				);
			})}
		</Swiper>
	);
};

export default ThumbsSlider;
