// Campaign types
export interface Campaign {
  owner: string;
  title: string;
  description: string;
  target: string;
  deadline: number;
  amountCollected: string;
  image: string;
  pId: number;
}

export interface CampaignForm {
  title: string;
  description: string;
  target: string;
  deadline: string;
  image: string;
}

export interface Donation {
  donator: string;
  donation: string;
}

// Navigation types
export interface NavLink {
  name: string;
  imgUrl: string;
  link: string;
  disabled?: boolean;
}

// Component prop types
export interface IconProps {
  styles?: string;
  name?: string;
  imgUrl: string;
  isActive?: string;
  disabled?: boolean;
  handleClick?: () => void;
}

export interface CustomButtonProps {
  btnType?: "button" | "submit";
  title: string;
  styles?: string;
  handleClick?: () => void;
}

export interface FormFieldProps {
  labelName: string;
  placeholder: string;
  inputType: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isTextArea?: boolean;
}

export interface CountBoxProps {
  title: string;
  value: string | number;
  styles?: string;
}

export interface FundCardProps {
  campaign: Campaign;
  handleClick: () => void;
}

export interface DisplayCampaignsProps {
  title: string;
  isLoading: boolean;
  campaigns: Campaign[];
}

// Context types
export interface StateContextType {
  address: string | undefined;
  contract: any;
  connect: () => Promise<void>;
  createCampaign: (form: CampaignForm) => Promise<void>;
  getCampaigns: () => Promise<Campaign[]>;
  getUserCampaigns: () => Promise<Campaign[]>;
  donate: (pId: number, amount: string) => Promise<any>;
  getDonations: (pId: number) => Promise<Donation[]>;
}

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

