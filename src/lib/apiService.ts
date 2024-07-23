/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
import axios, { AxiosResponse } from "axios";
import {
  UserProfileData,
  NotificationReadResponse,
  Notification,
} from "../types/api";
import { CampaignReportData } from "../types/api";
import { DashboardAnalyticsData } from "../types/api";

const getAccessToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

const apiService = axios.create({
  baseURL: "https://motion365-a63846f84620.herokuapp.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

apiService.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchUserProfile = async (): Promise<UserProfileData> => {
  try {
    const response: AxiosResponse<UserProfileData> = await apiService.get(
      "/user/profile"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const markNotificationAsRead =
  async (): Promise<NotificationReadResponse> => {
    try {
      const response: AxiosResponse<NotificationReadResponse> =
        await apiService.put("/notification/read");
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export const fetchNotifications = async (): Promise<Notification[]> => {
  try {
    const response: AxiosResponse<{ data: Notification[] }> =
      await apiService.get("/notification/category/in-app");
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const createCampaign = async (campaignData: {
  name: string;
  description: string;
  sub_plan_id: string;
  is_draft: boolean;
}): Promise<any> => {
  try {
    const response = await apiService.post("/campaign", campaignData);
    if (response.status === 200 || response.status === 201) {
      console.log(response.data);
      return response;
    } else {
      throw new Error("Failed to create campaign");
    }
  } catch (error) {
    throw error;
  }
};

export const fetchCampaignReport = async (
  campaignId: string
): Promise<CampaignReportData> => {
  try {
    const response: AxiosResponse<{ data: CampaignReportData }> =
      await apiService.get(`/campaign/${campaignId}/report`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const uploadMedia = async (formData: FormData) => {
  return await apiService.post("/media/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const recordMediaToCampaign = async (
  campaignId: string,
  mediaDetails: { public_ids: string[] }
) => {
  return await apiService.post(`/campaigns/${campaignId}/media`, mediaDetails);
};

export const recordMedia = async ({ id, post }: any) => {
  try {
    const response: AxiosResponse<any> = await apiService.post(
      `/campaign/${id}/media`,
      post
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchPlans = async (): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await apiService.get("/plan");
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchDashboardAnalytics =
  async (): Promise<DashboardAnalyticsData> => {
    try {
      const response: AxiosResponse<{ data: DashboardAnalyticsData }> =
        await apiService.get(`/campaign/dashboard-analytics`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };

export default apiService;
