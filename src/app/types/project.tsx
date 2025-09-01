
export type Project = {
    name: string,
    description: string,
    technologies: string[],
    status: "WIP" | "Alpha" | "Beta" | "Complete" | "Experimental",
    features: string[],
    role: string,
    links: {
        demo: string,
        github_repo: string
    },
    development_time: string,
    other_notes: string | null,
    visuals: string[],
}