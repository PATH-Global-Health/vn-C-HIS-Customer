export interface Ward {
    value: string,
}

export interface District {
    value: string,
    wards: Ward[],
}

export interface CityS {
    value: string,
    districts: District[]
}