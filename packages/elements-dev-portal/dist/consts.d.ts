export declare const devPortalCacheKeys: {
    all: readonly ["@stoplight/elements-dev-portal/client-query"];
    projects: () => readonly ["@stoplight/elements-dev-portal/client-query", "projects"];
    project: (projectId: string) => readonly ["@stoplight/elements-dev-portal/client-query", "projects", string];
    projectsList: () => readonly ["@stoplight/elements-dev-portal/client-query", "projects", "list"];
    projectDetails: (projectId: string) => readonly ["@stoplight/elements-dev-portal/client-query", "projects", string, "details"];
    branches: (projectId: string) => readonly ["@stoplight/elements-dev-portal/client-query", "projects", string, "branches"];
    branch: (projectId: string, branch: string) => readonly ["@stoplight/elements-dev-portal/client-query", "projects", string, "branches", string];
    branchesList: (projectId: string) => readonly ["@stoplight/elements-dev-portal/client-query", "projects", string, "branches", "list"];
    branchDetails: (projectId: string, branch: string) => readonly ["@stoplight/elements-dev-portal/client-query", "projects", string, "branches", string, "details"];
    branchTOC: (projectId: string, branch: string) => readonly ["@stoplight/elements-dev-portal/client-query", "projects", string, "branches", string, "toc"];
    branchNodes: (projectId: string, branch: string) => readonly ["@stoplight/elements-dev-portal/client-query", "projects", string, "branches", string, "nodes"];
    branchNode: (projectId: string, branch: string, node: string) => readonly ["@stoplight/elements-dev-portal/client-query", "projects", string, "branches", string, "nodes", string];
    branchNodesList: (projectId: string, branch: string) => readonly ["@stoplight/elements-dev-portal/client-query", "projects", string, "branches", string, "nodes", "list"];
    branchNodeDetails: (projectId: string, branch: string, node: string) => readonly ["@stoplight/elements-dev-portal/client-query", "projects", string, "branches", string, "nodes", string, "details"];
    search: () => string[];
    searchNodes: (filters: {
        projectIds?: string[];
        branchSlug?: string;
        workspaceId?: string;
        search?: string;
    }) => (string | {
        projectIds?: string[] | undefined;
        branchSlug?: string | undefined;
        workspaceId?: string | undefined;
        search?: string | undefined;
    })[];
};
