import ThumbsSlider from "../ThumbsSlider/ThumbsSlider";
import "./NavMenu.scss";

const NavMenu = ({ setThumbsSwiper, mainSwiper, isHide }: { isHide: boolean; setThumbsSwiper: any; mainSwiper: any }) => {
	const containerClassName = isHide ? "navMenu__container hide" : "navMenu__container";

	return (
		<div className={containerClassName}>
			<p className="navMenu__title">my projects</p>
			<ThumbsSlider mainSwiper={mainSwiper} setThumbsSwiper={setThumbsSwiper} />
		</div>
	);
};

export default NavMenu;
