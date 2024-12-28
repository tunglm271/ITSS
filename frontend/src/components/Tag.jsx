import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"


function Tag({ tag }) {
  const navigate = useNavigate()
  return (
    <div className="tag" onClick={() => navigate(`/tabs/${tag}`)} style={{cursor: "pointer"}}>
        {tag}
    </div>
  )
}

Tag.propTypes = {
    tag: PropTypes.string.isRequired
}

export default Tag