import React, { useState, useContext, useEffect } from "react";
import styles from "./InviteCard.module.scss";
import DeclineDialog from "../../../components/CancellationDialog";
import Translation from "../../../assets/translation.json";
import { API, graphqlOperation } from "aws-amplify";
import { RootContext } from "../../../context/RootContext";
import NegotiateDialog from "../NegotiateDialog";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import moment from "moment";

const InviteCard = ({
  createdBy,
  campaignId,
  invitationMessage,
  handleReviewAndSign,
  negotiables,
  data,
  getCampaign,
}) => {
  const history = useHistory();
  const [decline, setDecline] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const [reasonDetail, setReasonDetail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [negotiateDialog, setNegotiateDialog] = useState(false);
  const [nego, setNego] = useState([]);
  const [negotiater, setNegotiater] = useState("");
  const [negotiate, setNegotiate] = useState([
    {
      negotiateItem: "",
      negotiateMessage: "",
      negotiateValue: "",
      negotiateStartDate: "",
      negotiateEndDate: "",
    },
  ]);
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);

  const { brandId } = useContext(RootContext);
  useEffect(() => {
    if (
      data &&
      data !== null &&
      data.negotiations &&
      data.negotiations !== null &&
      data.negotiations.length !== 0
    ) {
      const element = data.negotiations.find(
        (item) => item.organization.id === data.brand.id
      );

      if (element) {
        setNegotiater(
          element && element.organization ? element.organization.name : ""
        );
        let neggo = [];
        Object.keys(element).map((item) => {
          if (
            item === "postFee" ||
            item === "revenueShare" ||
            item === "monthlyRetainerFee" ||
            item === "giftCard"
          ) {
            if (element[item] != null) {
              if (item === "revenueShare") {
                neggo.push({
                  negotiateItem: item,
                  negotiateValue: element[item].percentage,
                  accept: false,
                  newPrice: false,
                  newPriceValue: "",
                });
              } else {
                neggo.push({
                  negotiateItem: item,
                  negotiateValue: element[item].amount,
                  accept: false,
                  newPrice: false,
                  newPriceValue: "",
                });
              }
            }
          }
        });
        setNego(neggo);
      }
    }
  }, []);

  const reasons = [
    "Schedule conflict",
    "Campaign compensation",
    "Conflict of interest",
    "Other",
  ];

  const getNegotiables = (item) => {
    var temp = negotiate.filter((nego) => nego.negotiateItem === item);

    let USD = "USD";
    if (!temp || temp.length < 1) {
      return;
    }
    if (temp[0].negotiateItem === "revenueShare") {
      return { percentage: temp[0].negotiateValue };
    } else {
      return { amount: temp[0].negotiateValue, currency: USD };
    }
  };

  const handleNegotiation = () => {
    setNegotiateDialog(true);
    acceptCampaignInvite("negotiate");
  };

  const handleNegotiate = (val, index, fieldName) => {
    const nego = [...negotiate];
    if (fieldName === "Negotiate Item") {
      nego[index]["negotiateItem"] = val;
    }
    if (fieldName === "Negotiate Value") {
      nego[index]["negotiateValue"] = val;
    }
    if (fieldName === "Negotiate Message") {
      nego[index]["negotiateMessage"] = val;
    }
    if (fieldName === "Negotite StartDate") {
      const moment_date = moment(val).format("L");
      const startDate =
        val !== "" && moment(val, "MM/DD/YYYY", true).isValid()
          ? moment_date
          : val;
      const endDate = moment(moment_date).add(1, "M").format("MM/DD/YYYY");
      nego[index]["negotiateStartDate"] = startDate;
      nego[index]["negotiateEndDate"] = endDate;
      setStartDateOpen(false);
    }
    setNegotiate(nego);
  };

  const handleDeclineReason = (val) => {
    setDeclineReason(val);
  };
  const handleReasonDetail = (val) => {
    setReasonDetail(val);
  };
  const handleAcceptInvite = () => {
    acceptCampaignInvite();
    handleReviewAndSign();
  };

  const handleAnotherItem = () => {
    const nego = [...negotiate];

    nego.push({
      negotiateItem: "",
      negotiateMessage: "",
      negotiateValue: "",
    });

    setNegotiate(nego);
  };

  const acceptCampaignInvite = async (negotiate) => {
    try {
      await API.graphql(
        graphqlOperation(
          `mutation AcceptInvite {
						acceptCampaignInvite(input: {
							brandId: "${createdBy.id}" , 
							influencerId: "${brandId}", 
							id: "${campaignId}"}) 
							{
							id
						}
					}`
        )
      );
      if (!negotiate) {
        acceptCampaignTerms();
      }
    } catch (e) {
      console.log("Error in accepting invite", e);
    }
  };

  const acceptCampaignTerms = async () => {
    try {
      await API.graphql(
        graphqlOperation(
          `mutation AcceptCampaignTerms {
						influencerAcceptCampaignTerms(input: {
							campaignId: "${campaignId}",
							influencerId: "${brandId}"
						})
					}`
        )
      );
      // getCampaign();
    } catch (e) {
      console.log("Error in accepting campaign terms ", e);
    }
  };

  const declineCampaignInvite = async () => {
    try {
      await API.graphql(
        graphqlOperation(
          `mutation declineInvite {
						declineCampaign (
							id: "${campaignId}",
							influencerId: "${brandId}",
							reason: "${declineReason}",
							message: "${reasonDetail}"
						)
					}`
        )
      );
      setDecline(false);
      history.push(`/campaigns`);
    } catch (err) {
      console.log("Error In declining campaign invite", err);
      let message = "";

      if (err.errors && err.errors.length > 0)
        err.errors.forEach((m) => {
          message = message + m.message;
        });

      setErrorMessage(message);
      return null;
    }
  };

  const negotiateCampaign = async () => {
    try {
      let data = {
        campaignId: campaignId,
        message: negotiate[0].negotiateMessage,
        revenueShare: getNegotiables("revenueShare"),
        postFee: getNegotiables("postFee"),
        giftCard: getNegotiables("giftCard"),
        monthlyRetainerFee: getNegotiables("monthlyRetainerFee"),
      };
      await API.graphql(
        graphqlOperation(
          `mutation negotiateCampaign($input: NegotiationInput! ) {
						influencerNegotiate (
							influencerId: "${brandId}" ,
							input: $input ){
								
								id
						}
					}`,
          {
            input: data,
          }
        )
      );
      setNegotiateDialog(false);
      getCampaign();
      //   window.location.reload();
    } catch (e) {
      setNegotiateDialog(false);
      console.log("error in negotiate Campaign", e);
      let message = '';

      if (e.errors && e.errors.length > 0)
        e.errors.forEach((m) => {
          message = message + m.message;
        });

      setErrorMessage(message);
    }
  };

  const getHeading = (value) => {
    switch (value) {
      case "postFee":
        return "Cash Per Post";
      case "revenueShare":
        return "Revenue Share";
      case "monthlyRetainerFee":
        return "Monthly Retainer Fee";
      case "giftCard":
        return "Gift Card";
    }
  };

  return (
    <>
      <DeclineDialog
        open={decline}
        handleClose={() => setDecline(false)}
        reason={declineReason}
        reasons={reasons}
        handleReason={handleDeclineReason}
        message={Translation.DIALOG.CAMPAIGN_DECLINE_DIALOG_MSG}
        buttonText="Decline"
        handleReasonDetail={handleReasonDetail}
        reasonDetail={reasonDetail}
        handleDeclineCampaignInvite={declineCampaignInvite}
        errorMessage={errorMessage}
      />
      <NegotiateDialog
        open={negotiateDialog}
				openDialog = {() => setNegotiateDialog(true)}
        negotiables={negotiables}
        handleClose={() => setNegotiateDialog(false)}
        negotiate={negotiate}
        handleNegotiate={handleNegotiate}
        handleAnotherItem={handleAnotherItem}
        negotiateCampaign={negotiateCampaign}
        startDateOpen={startDateOpen}
        endDateOpen={endDateOpen}
        handleStartDateOpen={(value) => setStartDateOpen(value)}
        handleEndDateOpen={(value) => setEndDateOpen(value)}
				errorMessage={errorMessage}
      />
      <div className={styles.declineContainer}>
        <h1>
          {nego && nego.length > 0
            ? `${negotiater} has sent a counter offer`
            : `${createdBy.name} has invited you to a campaign`}
        </h1>
        {nego && nego.length > 0 ? (
          nego.map((item) => {
            return (
              <p className={styles.firstp}>
                {negotiater} is proposing a {getHeading(item.negotiateItem)} of{" "}
                {item.negotiateItem !== "revenueShare" ? "$" : ""}{" "}
                {item.negotiateValue}{" "}
                {item.negotiateItem === "revenueShare" ? "%" : ""}
              </p>
            );
          })
        ) : (
          <p className={styles.firstp}>{invitationMessage}</p>
        )}

        <p className={styles.secondp}></p>
        <div className={styles.buttonContainer}>
          <button
            className={styles.accept}
            onClick={() => handleAcceptInvite()}
          >
            Accept
          </button>
          <button className={styles.nego} onClick={() => handleNegotiation()}>
            Negotiate
          </button>
          <button className={styles.decline} onClick={() => setDecline(true)}>
            Decline
          </button>
        </div>
      </div>{" "}
    </>
  );
};

export default InviteCard;
