const TagCard = ({tag}) => {
    return (
        <div className="tag-card">
            <h3>{tag.name}</h3>
            <p>{tag.description}</p>
            <span>{tag.postCount}件のポスト</span>
        </div>
    );
}

export default TagCard;