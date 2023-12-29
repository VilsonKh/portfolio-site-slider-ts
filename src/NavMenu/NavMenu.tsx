import ThumbsSlider from "../ThumbsSlider/ThumbsSlider";
import "./NavMenu.scss";

const NavMenu = ({setThumbsSwiper, mainSwiper} : {setThumbsSwiper: any, mainSwiper: any}) => {
  return (
    <div className="navMenu__container">
      <p className="navMenu__title">my projects</p>
      <ThumbsSlider mainSwiper={mainSwiper} setThumbsSwiper={setThumbsSwiper}/>
    </div>
  )
}

export default NavMenu