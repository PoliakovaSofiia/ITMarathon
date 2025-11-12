import { useRef } from "react";
import IconButton from "../icon-button/IconButton";
import CopyButton from "../copy-button/CopyButton";
import InfoButton from "../info-button/InfoButton";
import ItemCard from "../item-card/ItemCard";
import { type ParticipantCardProps } from "./types";
import useToaster from "@hooks/useToaster";
import { BASE_API_URL } from "@utils/general";
import "./ParticipantCard.scss";

const ParticipantCard = ({
  id,
  userCode,
  firstName,
  lastName,
  isCurrentUser = false,
  isAdmin = false,
  isCurrentUserAdmin = false,
  adminInfo = "",
  participantLink = "",
  onInfoButtonClick,
}: ParticipantCardProps) => {
  const { showToast } = useToaster();

  const handleDelete = async () => {
    if (!id || !userCode) return;

    const confirmed = confirm(`Remove ${firstName} ${lastName} from the room?`);
    if (!confirmed) return;

    try {
      const url = `${BASE_API_URL}/api/users/${id}?userCode=${encodeURIComponent(
        userCode,
      )}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      showToast("Participant removed", "success", "small");
      // Simple refresh so parent re-fetch happens (keeps changes minimal)
      window.location.reload();
    } catch (err) {
      showToast("Failed to remove participant", "error", "small");
    }
  };

  return (
    <ItemCard title={`${firstName} ${lastName}`} isFocusable>
      <div className="participant-card-info-container">
        {isCurrentUser ? <p className="participant-card-role">You</p> : null}

        {!isCurrentUser && isAdmin ? (
          <p className="participant-card-role">Admin</p>
        ) : null}

        {isCurrentUserAdmin ? (
          <CopyButton
            textToCopy={participantLink}
            iconName="link"
            successMessage="Personal Link is copied!"
            errorMessage="Personal Link was not copied. Try again."
          />
        ) : null}

        {isCurrentUserAdmin && !isAdmin ? (
          <InfoButton withoutToaster onClick={onInfoButtonClick} />
        ) : null}

        {!isCurrentUser && isAdmin ? <InfoButton infoMessage={adminInfo} /> : null}

        {/* Delete button: visible to current admin for non-admin participants */}
        {isCurrentUserAdmin && !isAdmin ? (
          <IconButton
            iconName="cross"
            color="green"
            onClick={handleDelete}
            aria-label="Remove participant"
          />
        ) : null}
      </div>
    </ItemCard>
  );
};

export default ParticipantCard;
