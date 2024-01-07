function News({ news }) {
    console.log('news', news);
    return (
        <div>
            {news ? (
                <>
                    {news.news.map((article, index) => (
                        <div className="card mb-4 pt-3" key={`article-${index}`}>
                            <div className="d-flex column card-body">
                                <div>
                                            <img src={article.urlToImage} width="250"/>
                                        </div>
                                    </div>
                                    <table className="table table-borderless">
                                        <tbody>
                                            <tr>
                                                <th scope="row">Title</th>
                                                <td><a href={article.url} target='_blank' rel="noopener noreferrer">{article.title}</a></td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Date</th>
                                                <td>{article.publishedAt}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Author</th>
                                                <td>{article.author}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Source</th>
                                                <td>{article.source.name}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Description</th>
                                                <td>{article.description}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Content</th>
                                                <td>{article.content}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                        </div>
                    ))}
                </>
            ) : null}
        </div>
    );
}

export default News;
