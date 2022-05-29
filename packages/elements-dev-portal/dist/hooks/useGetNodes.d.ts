export declare function useGetNodes({ search, workspaceId, projectIds, branch, pause, }: {
    search: string;
    workspaceId?: string;
    projectIds?: string[];
    branch?: string;
    pause?: boolean;
}): import("react-query").UseQueryResult<import("..").NodeSearchResult[], unknown>;
