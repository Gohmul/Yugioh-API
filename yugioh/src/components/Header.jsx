import Nav from "./Nav"
import headerPicture from './yugioh1.jpeg'

export default function Header () {
    return(
        <div className="header">
            <div className="header-text">Yu-gi-oh!</div>
            {/* <img className="headerpic" src={headerPicture}/> */}
            <Nav/>
        </div>

    )
}