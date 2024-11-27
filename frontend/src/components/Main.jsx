import Header from './Header'
import PostSection from './PostSection'
import PropTypes from 'prop-types';

function Main({posts}) {
    console.log('Posts:', posts);
    return (
        <div className="layout">
           <div className="pix">
                <Header />
                <div id='title'>
                    <div>
                        <h1 style={{marginBottom: '5px'}}>Hedspidaotao</h1>
                        <h2>スライド作成時間の最適化アシスタント</h2>
                    </div>

                    <div style={{textAlign: "end", display: "flex", flexDirection: "column", justifyContent: "end"}}>
                        <h3 style={{marginBottom: '5px'}}>Powerered by</h3>
                        <h3>Doraemonテーム</h3>
                    </div>
                </div>
           </div>
           <PostSection posts={posts}/>
        </div>

    )
}


Main.propTypes = {
    posts: PropTypes.array.isRequired,
};

export default Main