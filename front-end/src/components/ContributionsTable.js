function ContributionsTable({ contributions, summary }) {
    return (
        <div>
            {summary && contributions && contributions.cycle && contributions.contributors && (
                <div className="col">
                    <p>Campaign finance summary for the {contributions.cycle} election cycle:</p>
                    <div className="card mb-4">
                        <div className="card-body">
                            <table className="table table-borderless">
                                <tbody>
                                    <tr>
                                        <th scope="row">Cash on Hand</th>
                                        <td>{summary.cashOnHand}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Raised This Cycle</th>
                                        <td>{summary.total}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Total Debt</th>
                                        <td>{summary.debt}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Spent this Cycle</th>
                                        <td>{summary.spent}</td>
                                    </tr>

                                </tbody>
                            </table>
                            <div className="small">*** Information last updated {summary.lastUpdated}</div>
                        </div>
                    </div>
                    <p>Top {contributions.contributors.length} contributors for the {contributions.cycle} election cycle:</p>
                    <div className="card mb-4">
                        <div className="card-body">
                            <table className="table table-borderless">
                                <thead>
                                    <tr>
                                        <th>Contributor</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contributions.contributors.map((contributor, index) => (
                                        <tr key={`contributor-${index}`}>
                                            <td>{contributor['@attributes'].org_name}</td>
                                            <td>
                                                {new Intl.NumberFormat('en-US', {
                                                    style: 'currency',
                                                    currency: 'USD',
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 0,
                                                }).format(contributor['@attributes'].total)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ContributionsTable;
