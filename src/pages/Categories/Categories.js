import "./Categories.css";
import logo from "../../assets/octovoce-logo.svg";
import CategoryCard from "../../component/CategoryCard/CategoryCard";
import { Link } from "react-router-dom";
import CategoriesList from "../../servives/categories.json";
import RightSvg from "../../assets/RightSvg";

const Categories = () => {
  return (
    <>
        <div className="iconic-icon">
          <RightSvg />
        </div>
        <div className="category-page-wrapper">
          <div className="heading-wrapper">
            <img src={logo} alt="logo" />
            <span className="topic-name">
              Select your Category from Following Categories.
            </span>
            <span className="topic-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a
              sollicitudin elit. Suspendisse in lectus nec mi congue aliquam.
              Nullam porta porta nunc ut mollis. 
            </span>
          </div>
          <div className="category-list">
            {CategoriesList.map((item) => {
              return (
                <Link to={`/${item.name}/select-mode`} key={item.name}>
                  <CategoryCard title={item.name} />
                </Link>
              );
            })}
          </div>
        </div>
    </>
  );
};

export default Categories;
