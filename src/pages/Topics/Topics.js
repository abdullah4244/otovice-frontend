import "./Topics.css";
import logo from "../../assets/octovoce-logo.svg";
import { Link, useParams } from "react-router-dom";
import CategoriesList from "../../servives/categories.json";
import TopicCard from "../../component/TopicCard/TopicCard";
import { useEffect, useState } from "react";
import RightSvg from "../../assets/RightSvg";

const Topics = () => {
  const { category,mode } = useParams();
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const topics = CategoriesList.find((item) => item.name == category);
    setTopics(topics?.topics);
  }, []);
  console.log(topics , "topics")
  return (
    <>
      <div className="iconic-icon">
        <RightSvg />
      </div>
      <div className="topics-page-wrapper">
        <div className="heading-wrapper">
          <img src={logo} alt="logo" />
          <span className="topic-name">
            Select your Topic from Following Topics.
          </span>
          <span className="topic-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a
            sollicitudin elit. Suspendisse in lectus nec mi congue aliquam.
            Nullam porta porta nunc ut mollis. 
          </span>
        </div>
        <div className="category-list">
          {topics?.map((item) => {
            return (
              <Link
                to={`/exam-partner/${mode}/${category}/${item.name}`}
                key={item.name}
              >
                <TopicCard title={item.name} description={item.description} />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Topics;
