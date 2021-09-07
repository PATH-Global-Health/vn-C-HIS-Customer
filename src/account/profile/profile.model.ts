export interface Profile {
  fullname: string,
  gender: boolean,
  dateOfBirth: string,
  phoneNumber: string,
  email: string,
  vaccinationCode: string,
  identityCard: string,
  address: string,
  province: string,
  district: string,
  ward: string,
  passportNumber: string,
  nation: string,
  id: string,
}
export type ProfileUM = Omit<Profile, 'id'>;