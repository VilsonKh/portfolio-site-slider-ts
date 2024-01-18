import "./HideBarButton.scss"

const HideBarButton = ({isHide, setIsHide}: {isHide: boolean,setIsHide: (value: any)=> void}) => {
  return (
    <button className='hideButton' onClick={() => setIsHide(!isHide)}>
      <img src="./assets/hide_sidebar.svg" alt="" />
    </button>
  )
}

export default HideBarButton