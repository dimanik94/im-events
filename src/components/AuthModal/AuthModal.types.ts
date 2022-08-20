export interface IAuthModalProps {
  isModalVisible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  setIsAuthorized: (isAuthorized: boolean) => void;
}
