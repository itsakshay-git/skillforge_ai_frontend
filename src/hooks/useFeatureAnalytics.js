import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export const useFeatureAnalytics = (routeType) => {
    return useQuery({
        queryKey: ["featureAnalytics", routeType],
        queryFn: async () => {
            const { data } = await axiosInstance.get(
                `/user/analytics/${routeType}`
            );
            return data.data;
        },
        enabled: !!routeType,
    });
};
