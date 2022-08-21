export interface IAuthModalProps {
  isModalVisible: boolean;
  handleCancel: () => void;
  setIsAuthorized: (isAuthorized: boolean) => void;
}
