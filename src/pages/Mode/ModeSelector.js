import logo from "../../assets/octovoce-logo.svg";
import CategoryCard from "../../component/CategoryCard/CategoryCard";
import RightSvg from "../../assets/RightSvg";
import { Link, useParams } from "react-router-dom";
import { Tooltip } from "antd";

const ModeSelector = () => {
  const { category } = useParams();
  return (
    <>
      <div className="iconic-icon">
        <RightSvg />
      </div>
      <div className="category-page-wrapper">
        <div className="heading-wrapper">
          <img src={logo} alt="logo" />
          <span className="topic-name">Select Mode.</span>
          <span className="topic-description">
            Lorem ipsum dolor sit amet, 
          </span>
        </div>
        <div className="mode-selector-wrapper">
          <Link to={`/${category}/test/topics`}>
            <CategoryCard title={"Test"} />
          </Link>

          <Link to={`/${category}/learn/topics`}>
            <CategoryCard title={"Learn"} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default ModeSelector;
