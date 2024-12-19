import { useNavigate } from "react-router-dom";

const TagCard = ({tag}) => {
    const navigate = useNavigate();

    return (
        <div className="tag-card" onClick={() => navigate(`/tabs/${tag.name}`)}>
            <h3>{tag.name}</h3>
            <p>{tag.description}</p>
            <span>{tag.postCount}件のポスト</span>
        </div>
    );
}

export default TagCard;