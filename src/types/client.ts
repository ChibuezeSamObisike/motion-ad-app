export interface IDashboardPageProps {
  title: string;
}

export interface ProfileDetails {
  lastname: string;
  firstname: string;
  fullname: string;
  email: string;
  company: string;
  jobTitle: string;
  phoneNumber: string;
  imageUrl: string;
  gender: string;
  address: string;
  // Add more profile details as needed
}

export interface EditProfileProps {
  profileDetails: ProfileDetails;
  handleCloseEditProfile: () => void;
}
