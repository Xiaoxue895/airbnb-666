import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaComments } from 'react-icons/fa';
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div className="footer-container">
          {/* <div>
            <a href="">
              <img src="" alt="" />
            </a>
          </div> */}
          <div className="my-info">
               <p>Xiaoxue(Alice) wang</p>
               <div className="my-link">
                    <a href="https://www.linkedin.com/in/xiaoxue-alice-wang-33b70b313/">
                    <FaGithub />
                    </a>
                    <a href="https://github.com/Xiaoxue895">
                    <FaLinkedin />
                    </a>
                    <a href="https://alice-wang-portfolio.netlify.app/">
                    <FaComments />
                    </a>
                </div>

        </div>
        <div className="inspiration">
          <p>
          This website is my first full-stack project, inspired by Airbnb. It features two complete CRUD operations. Feel free to contact me if you&lsquo;re interested!
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;