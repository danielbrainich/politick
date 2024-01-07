
function SponsoredBills({ sponsoredBills }) {
    return (
<div>
    <p>Your representative has sponsored a total of {sponsoredBills.count} bills. These are the {sponsoredBills.sponsoredLegislation.length} most recent:</p>
    {sponsoredBills.sponsoredLegislation && sponsoredBills.sponsoredLegislation.map((bill, index) => (
        <div className="card mb-4 pt-3" key={`bill-${index}`}>
            <div className="card-body">
                <h5 className="card-title ps-2">{`${bill.type}-${bill.number}`}</h5>
                <table className="table table-borderless">
                    <tbody>
                        <tr>
                            <th scope="row">Introduced</th>
                            <td>{bill.introducedDate}</td>
                        </tr>
                        <tr>
                            <th scope="row">Bill Title</th>
                            <td>{bill.title}</td>
                        </tr>
                        <tr>
                            <th scope="row">Latest Action</th>
                            <td>{`${bill.latestAction.text} (${bill.latestAction.actionDate})`}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    ))}
</div>
    );
}

export default SponsoredBills;
