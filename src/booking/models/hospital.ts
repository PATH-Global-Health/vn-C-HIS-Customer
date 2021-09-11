export interface Hospital {
    dateCreated: string,
    dateUpdated: string,
    id: string,
    username: string,
    name: string,
    unitTypeId: string,
    address: string,
    province: string,
    district: string,
    ward: string,
    website: string,
    phone: string,
    email: string,
    introduction: string,
    isDeleted: boolean,
}

export interface Doctor {
    pageIndex: number,
    pageSize: number,
    totalPage: number,
    totalSize: number,
    data: DoctorData[] | [],
}

export interface DoctorData {
    id: string,
    isDeleted: boolean,
    unit: Hospital[] | []
    code: string,
    fullName: string,
    identityCard: string,
    title: string,
    academicTitle: string,
    gender: boolean,
    email: string,
    phone: string
}