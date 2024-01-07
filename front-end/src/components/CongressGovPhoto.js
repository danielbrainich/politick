
function CongressGovPhoto({ info, photo }) {
    return (
        <div>
            {info && photo ? (
                <img src={photo} alt="Loaded content" />
            ) : (
                <div class="spinner-grow text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            )}
        </div>
    );
}

export default CongressGovPhoto;
