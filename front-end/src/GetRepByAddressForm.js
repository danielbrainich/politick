import React, { useState } from 'react';
import GetCivicInfoData from './api/civicInfo';
import getNewsApiData from './api/newsApi';
import { getOpenSecretsId, getOpenSecretsCandidateContributions, getOpenSecretsCandidateSummary } from './api/openSecretsIds';
import { getRepresentativeProPublicaInfo, getRepresentativeProPublicaStatements } from './api/proPublica';
import AddressForm from './components/AddressForm';
import Profile from './components/Profile';
import ContributionsTable from './components/ContributionsTable';
import CongressGovPhoto from './components/CongressGovPhoto';
import SponsoredBills from './components/SponsoredBills';
import Statements from './components/Statements.js';
import News from './components/News';
import { getCongressGovPhoto, getSponsoredBillInfo } from './api/congressGov';
import VotingInfo from './components/VotingInfo';

function GetRepByAddressForm() {
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [representativeInfo, setRepresentativeInfo] = useState({});
    const [repContribData, setRepContribData] = useState({});
    const [proPublicaInfo, setProPublicaInfo] = useState({});
    const [repContribSummary, setRepContribSummary] = useState({});
    const [repSponsoredBills, setRepSponsoredBills] = useState({});
    const [repStatements, setRepStatements] = useState({});
    const [news, setNews] = useState({});
    const [repPhoto, setRepPhoto] = useState({});

    const handleFormSubmit = async (formData) => {

        const address = `${formData.streetAddress} ${formData.city} ${formData.state} ${formData.zipCode}`;

        const repData = await GetCivicInfoData(address);
        setRepresentativeInfo(repData);

        const repId = await getOpenSecretsId(repData.representative.state, repData.representative.name);

        const contribData = await getOpenSecretsCandidateContributions(repId.repId);
        setRepContribData(contribData);

        const contribSummary = await getOpenSecretsCandidateSummary(repId.repId);
        setRepContribSummary(contribSummary);

        const proPubInfo = await getRepresentativeProPublicaInfo(repData.representative.name);
        setProPublicaInfo(proPubInfo);

        const congressGovPhoto = await getCongressGovPhoto(proPubInfo.id);
        setRepPhoto(congressGovPhoto);

        const sponsoredBillInfo = await getSponsoredBillInfo(proPubInfo.id);
        setRepSponsoredBills(sponsoredBillInfo);

        const repStatements = await getRepresentativeProPublicaStatements(proPubInfo.id);
        setRepStatements(repStatements);

        const news = await getNewsApiData(repData.representative.name);
        setNews(news)
        console.log(news)

        setIsFormSubmitted(true);
    };

    return (
        <div className="container">
            <div className="row min-vh-100">
                <div className="col-3 mt-5">
                    <AddressForm onSubmit={handleFormSubmit} />
                </div>
                <div className="col-9 mt-5">
                    {isFormSubmitted && (
                    <div className="col">
                        <ul className="nav nav-pills mb-3 d-flex justify-content-center w-100" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="rep-profile-tab" data-bs-toggle="pill" data-bs-target="#rep-profile" type="button" role="tab">Profile</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="contributions-tab" data-bs-toggle="pill" data-bs-target="#contributions" type="button" role="tab">Finances</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="voting-info-tab" data-bs-toggle="pill" data-bs-target="#voting-info" type="button" role="tab">Voting Info</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="sponsored-bills-tab" data-bs-toggle="pill" data-bs-target="#sponsored-bills" type="button" role="tab">Sponsored Bills</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="statements-tab" data-bs-toggle="pill" data-bs-target="#statements" type="button" role="tab">Statements</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="news-tab" data-bs-toggle="pill" data-bs-target="#news" type="button" role="tab">News</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="rep-profile" role="tabpanel" aria-labelledby="rep-info-tab">
                                <div className="mt-5 d-flex align-items-center">
                                    <div className="col-3 offset-3">
                                        <CongressGovPhoto info={proPublicaInfo} photo={repPhoto} />
                                    </div>
                                    <div className="col-3">
                                        <Profile profile={representativeInfo} />
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="contributions" role="tabpanel" aria-labelledby="contributions-tab">
                                <div className="d-flex flex-column align-items-center justify-content-center mt-5">
                                    <ContributionsTable contributions={repContribData} summary={repContribSummary}/>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="voting-info" role="tabpanel" aria-labelledby="voting-info-tab">
                                <div className="d-flex flex-column align-items-center justify-content-center mt-5">
                                    <VotingInfo info={proPublicaInfo} />
                                </div>
                            </div>
                            <div className="tab-pane fade" id="sponsored-bills" role="tabpanel" aria-labelledby="sponsored-bills-tab">
                                <div className="d-flex flex-column align-items-center justify-content-center mt-5">
                                    <SponsoredBills sponsoredBills={repSponsoredBills} />
                                </div>
                            </div>
                            <div className="tab-pane fade" id="statements" role="tabpanel" aria-labelledby="statements-tab">
                                <div className="d-flex flex-column align-items-center justify-content-center mt-5">
                                    <Statements statements={repStatements} />
                                </div>
                            </div>
                            <div className="tab-pane fade" id="news" role="tabpanel" aria-labelledby="news-tab">
                                <div className="d-flex flex-column align-items-center justify-content-center mt-5">
                                    <News news={news} />
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GetRepByAddressForm;
