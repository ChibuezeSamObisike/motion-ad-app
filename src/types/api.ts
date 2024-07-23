export interface UserProfileData {
  email: string;
  last_login: string;
  ip: string;
  id: string;
  role: string;
  email_verified: boolean;
  country: string;
  full_name: string;
  status: string;
  gender: string;
  home_address: string;
  profile_photo_url: string;
  phone_number: string;
  created_at: string;
  updated_at: string;
  account_type: string;
  device_token: string;
  device_type: string;
  reference_id: string;
  location: string;
  total_milage: number;
}

export interface PlaybackSummary {
  total_playback: number;
  month: string;
}

export interface TopLocation {
  location: string;
  views: number;
}

export interface ApiResponse {
  data: CampaignReportData;
  message: string;
  status: boolean;
}

export interface ViewByCity {
  city: string;
  views: number;
  total_minutes_played: number;
}

export interface CampaignReportData {
  playback_summary: PlaybackSummary[];
  top_location: TopLocation[];
  total_miles_reached: number;
  total_minutes_played: number;
  views_by_city: ViewByCity[];
}

export interface NotificationReadResponse {
  success: boolean;
  message: string;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
}

export interface Plan {
  id: string;
  name: string;
  sub_plan: {
    duration: string;
    cost: number;
    id: string;
    name: string;
    sub_plan: {
      duration: string;
      cost: number;
      id: string;
    }[];
  };
}
export interface MonthlyData {
  month: string;
  views: number;
  locations: number;
}

export interface CampaignPerformance {
  campaignName: string;
  performanceMetric: number; // Adjust based on actual data structure
}

export interface TopLocation {
  cities: string;
  miles: string;
  percentage: string;
}

export interface DashboardAnalyticsData {
  current_month_views: number;
  previous_month_views: number;
  total_views: number;
  views_change: number;
  locations: number;
  locations_change: number;
  ads_spend: number;
  ads_spend_change: number;
  current_month_ads_spend: number;
  monthly_data: MonthlyData[] | null;
  campaign_performance: CampaignPerformance[] | null;
  top_locations: TopLocation[] | null;
}
