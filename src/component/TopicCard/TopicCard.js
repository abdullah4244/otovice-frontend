import "./TopicCard.css";

const TopicCard = ({ title, description }) => {
  return (
    <div className="topic-card">
      <span className="title">{title}</span>
      <span className="desc">{description}</span>
    </div>
  );
};

export default TopicCard;
