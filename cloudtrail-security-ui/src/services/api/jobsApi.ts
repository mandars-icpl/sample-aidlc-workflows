import apiClient from './apiClient';
import { Job, FetchCloudTrailRequest, FetchCloudTrailResponse } from '../../types/api.types';

export const jobsApi = {
  fetchCloudTrail: async (params: FetchCloudTrailRequest): Promise<FetchCloudTrailResponse> => {
    const response = await apiClient.post<FetchCloudTrailResponse>(
      '/api/fetch-cloudtrail',
      params
    );
    return response.data;
  },

  getJobStatus: async (jobId: string): Promise<Job> => {
    const response = await apiClient.get<Job>(`/api/jobs/${jobId}`);
    return response.data;
  },
};
