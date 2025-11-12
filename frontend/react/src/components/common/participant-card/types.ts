export interface ParticipantCardProps {
  id?: number;
  userCode?: string;
  firstName: string;
  lastName: string;
  isCurrentUser?: boolean;
  isAdmin?: boolean;
  isCurrentUserAdmin?: boolean;
  adminInfo?: string;
  participantLink?: string;
  onInfoButtonClick?: () => void;
}
