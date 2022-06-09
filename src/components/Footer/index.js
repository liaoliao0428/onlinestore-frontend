import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLine , faFacebookSquare , faInstagram , faTwitter } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
    return (
        // footer
        <div className="footer">
            <div className="wrap">
                <div className="contact">
                    <h3>聯絡我們</h3>
                    <h3>聯絡我們</h3>
                    <h3>聯絡我們</h3>
                    <h3>聯絡我們</h3>
                    <h3>聯絡我們</h3>
                </div>
                <div className="link">
                    <a href="" ><FontAwesomeIcon icon={faFacebookSquare} /></a>
                    <a href="" ><FontAwesomeIcon icon={faTwitter} /></a>
                    <a href="" ><FontAwesomeIcon icon={faLine} /></a>
                    <a href="" ><FontAwesomeIcon icon={faInstagram} /></a>
                </div>            
            </div>
            <div className="dseign">
                &copy; design by Andy Liao
            </div>
        </div>
    )
}

export default Footer