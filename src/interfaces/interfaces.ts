export interface IAdvisor {
    _id?: string;
    icon: string,
    fullName: string,
    reviews: number,
    language: string,
    status: string,
    onSiteSince: string
}

export interface IFilter {
    language: string,
    status: string
}
