export type multiModalType = {
  formLabel: string;
  form: JSX.Element;
}[];

export type multiStepFormDataType = {
  userInfo: personalInfoType;
  selectedPlan: selectedPlanType;
  addsOn: addsOnType;
};

/* Types for CompanyInfoForm */
export type personalInfoType = {
  name: string;
  email: string;
  phone: phoneType;
};

export type phoneType = {
  number: string;
  countryData: countryDataType;
};

export type unknowObject = {
  [key: string]: any;
};

export type countryDataType = {
  name: string;
  shortName: string;
  phoneCode: string;
  flag?: any;
};

/* Types for SelectPlanForm */
export type selectedPlanType = {
  plan: planType;
  planDuration: string;
};

export type planType = {
  name: string;
  price: number;
};

export type planInputValuesType = {
  name: string;
  price: number;
  imageUrl: string;
};

/* Types for AddsOnForm */
export type addsOnType = addOnType[];

export type addOnType = {
  name: string;
  price: number;
};

export type addsOnCheckboxValuesType = {
  name: string;
  description: string;
  price: number;
};
