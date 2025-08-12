import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '@/lib/axios'

export function useUserHistory(limit = 3) {
    const queryClient = useQueryClient();

    const historyQuery = useInfiniteQuery({
        queryKey: ['userHistory', limit],
        queryFn: async ({ pageParam = 0 }) => {
            const res = await axiosInstance.get(`/user/history?limit=${limit}&offset=${pageParam}`)
            if (!res.data.success) throw new Error('Failed to fetch history')
            return {
                data: res.data.data,
                nextOffset: pageParam + limit,
                hasMore: res.data.data.length === limit
            }
        },
        getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextOffset : undefined,
    });

    const deleteHistoryItem = useMutation({
        mutationFn: (id) => axiosInstance.delete(`/user/history/${id}`),
        onSuccess: () => queryClient.invalidateQueries(['userHistory'])
    });

    const clearHistory = useMutation({
        mutationFn: () => axiosInstance.delete(`/user/history`),
        onSuccess: () => queryClient.invalidateQueries(['userHistory'])
    });

    return {
        ...historyQuery,
        deleteHistoryItem,
        clearHistory
    }
}
