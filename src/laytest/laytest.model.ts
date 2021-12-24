interface Customer {
  id: string,
  fullname: string,
  phone: string,
  email: string,
  address: string,
  gender: boolean
  provinceCode: string,
  districtCode: string,
  wardCode: string,
  ic: string,
  nation: string,
  passportNumber: string,
}
interface Employee {
  employeeId: string,
  name: string,
}
interface Result {
  type: 1,
  hivPublicExaminationDate: number,
  publicExaminationOrder: string,
  examinationForm: number,
  receptionId: string,
  takenDate: number,
  testingDate: string,
  resultDate: string,
  resultTesting: string,
  viralLoad: number,
  code: string,
}
export interface Laytest {
  id: string,
  isDelete: boolean,
  dateCreate: string,
  dateUpdate: string,
  customer: Customer,
  cdO_Employee: Employee,
  result: Result,
}
export interface LaytestResponse {
  totalSize: number;
  pageSize: number;
  data: Laytest[];
}
