import "./CategoryCard.css";

const CategoryCard = ({ title }) => {
  return (
    <div className="category-card">
      <span className="title">{title}</span>
    </div>
  );
};

export default CategoryCard;
