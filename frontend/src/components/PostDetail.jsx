import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Tag from './Tag';

function PostDetail({post}) {
    const tagList = ['ITSS', "Nice", "PHP", "React"];
    return (
        <div className="post-layout">
            <div style={{marginBottom: '10px', display: 'flex', justifyContent: 'space-between'}}>
                <div className='tag-list'>
                    {tagList.map((tag, index) => <Tag key={index} tag={tag} />)}
                </div>
                <img src="https://s3-alpha-sig.figma.com/img/3116/0882/a171a1a96a6bb1205357e81451fed61e?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iJdtcO8MkyrRb2Y~TxrU8pLIy6YacmeEICDdcXRwV3jGSehhRa5-TBoMwumcMfqETWg~8jR~PaNQ-4UpJlObiKEdSXAo0muGuZCEtYU~l9fdloAgXDL~fqrUA6VTaQHG~NZIb9RHQfIfWsr9L8ZbTk~l5nivVjEZIYnKRJqQPsmpUqDcay~SwI-~oQ~HCxoYX~SJ83vN4gJGCm~k8l7fZbJljmH6Jzi6eZKManxPS~rNRtfLK1a99eH76ndNj753EUgsUFsVO1NH1-mH1BWdCAdxOCfnj-QWh2I8tpVuN1qX1TbpxmAmo18H4eR0EQeYhlE02E3Cal-8Ax9yK4UvJQ__" alt="" className='flower-img'/>
            </div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <span><img width="40px" height="40px" src="../src/assets/pdfIcon.svg" /><Link>demo.pdf</Link></span>
        </div>
    );
}

PostDetail.propTypes = {
    post: PropTypes.object.isRequired,
};

export default PostDetail;