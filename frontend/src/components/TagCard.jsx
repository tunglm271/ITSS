const TagCard = ({tag}) => {
    return (
        <div className="tag-card">
            <h3>{tag.name}</h3>
            <p>{tag.description}</p>
            <span>今日、512件のポスト</span>
        </div>
    );
}

export default TagCard;
