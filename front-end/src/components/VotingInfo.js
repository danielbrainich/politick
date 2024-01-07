
function VotingInfo({ info }) {
    return (
        <div className="card mb-4">
            <div className="card-body">
                <table className="table table-borderless">
                    <tbody>
                        <tr>
                            <th scope="row">Missed Vote Percentage</th>
                            <td>{Math.round(info.missed_votes_pct)}%</td>
                        </tr>
                        <tr>
                            <th scope="row">Votes with Party Percentage</th>
                            <td>{Math.round(info.votes_with_party_pct)}%</td>
                        </tr>
                        <tr>
                            <th scope="row">Votes against Party Percentage</th>
                            <td>{Math.round(info.votes_against_party_pct)}%</td>
                        </tr>
                        <tr>
                            <th scope="row">Total Present Votes</th>
                            <td>{info.total_present}</td>
                        </tr>
                        <tr>
                            <th scope="row">Total Votes</th>
                            <td>{info.total_votes}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default VotingInfo;
