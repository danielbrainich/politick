
function Statements({ statements }) {
    console.log('hello', statements)
    return (
        <div>
            <p>Your representative published a total of {statements.num_results} statements during the {statements.congress}th Congress:</p>
            {statements && statements.results.map((statement, index) => (
                <div className="card mb-4 pt-3" key={`statement-${index}`}>
                    <div className="card-body">
                        <h5 className="card-title ps-2">{statement.date}</h5>
                        <table className="table table-borderless">
                            <tbody>
                                <tr>
                                    <th scope="row">Type</th>
                                    <td>{statement.statement_type}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Title</th>
                                    <td><a href={statement.url} target='_blank' >{statement.title}</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Statements;
