
function RepresentativeInfo({ repInfo }) {
    return (
        <div className="card">
            <div className="card-body">
                {repInfo.representative && repInfo.office && (
                    <div>
                        <h2 className="card-title">{repInfo.representative.name}</h2>
                        <p className="card-text">{repInfo.office.name}</p>
                        <p className="card-text">{repInfo.representative.party}</p>
                        <p className="card-text">{repInfo.office.district}</p>
                        {repInfo.representative.channels && (
                            <div>
                                {repInfo.representative.channels.map((channel, index) => (
                                    <p className="card-text" key={`channel-${index}`}>
                                        {channel.type}: {channel.id}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default RepresentativeInfo;
