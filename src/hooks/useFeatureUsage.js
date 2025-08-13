import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export const useFeatureUsage = () => {
    return useQuery({
        queryKey: ["featureUsage"],
        queryFn: async () => {
            const { data } = await axiosInstance.get("/user/feature-usage");
            return data.data;
        },
    });
};
