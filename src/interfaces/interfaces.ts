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
    push(newFilter: { title: string; value: string; }): unknown;
    title: string,
    value: string
}
