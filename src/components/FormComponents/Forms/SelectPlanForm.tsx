import FormInput from '@/components/FormComponents/Components/FormInput';
import {
  countryDataType,
  multiStepFormDataType,
  personalInfoType,
} from '@/types/FormTypes';
import { ChangeEvent, FormEvent, useState } from 'react';

type errorType = {
  errorName?: string;
  errorEmail?: string;
  errorPhone?: string;
};

const SelectPlanForm = ({
  data,
  saveData,
  setContinue,
}: {
  data: personalInfoType;
  saveData: React.Dispatch<React.SetStateAction<multiStepFormDataType>>;
  setContinue: (x: boolean) => void;
}) => {
  const { name, email, phone } = data;
  const [errorMessages, setErrorMessages] = useState<errorType>({});

  function handleChange(e: ChangeEvent<HTMLInputElement> | countryDataType) {
    if (
      errorMessages.errorEmail ||
      errorMessages.errorName ||
      errorMessages.errorPhone
    )
      setErrorMessages({});

    let userInfo: any = {
      ...data,
    };

    if (!('phoneCode' in e)) {
      let value = e.target.value;
      if (e.target.name === 'phone') {
        value = value.replaceAll(/[^0-9]+/gm, '');
        value = value.length > 12 ? value.substring(0, 12) : value;

        userInfo.phone = { ...phone, number: value };
      } else userInfo[e.target.name] = value;
    } else userInfo.phone = { ...phone, countryData: e };

    saveData((prev) => ({
      ...prev,
      userInfo: {
        ...prev.userInfo,
        ...userInfo,
      },
    }));
  }

  function checkValidValues(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name) return setErrorMessages({ errorName: 'This field is required' });
    if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.exec(email))
      return setErrorMessages({
        errorEmail: !email ? 'This field is required' : 'Invalid Email',
      });

    if (
      !phone.number ||
      !phone.countryData.name ||
      !phone.countryData.phoneCode
    )
      return setErrorMessages({
        errorPhone: !phone.countryData.phoneCode
          ? 'Select a Country code'
          : 'This field is required',
      });

    setContinue(true);
  }

  return (
    <div>
      <div className="mb-4 lg:mb-8">
        <h2 className="font-semibold text-marine-blue text-[2rem] leading-8 mb-3 sm-lg:text-2xl">
          Company information
        </h2>
        <p className="text-cool-gray sm-lg:text-base">
          Please provide your name, email address, and phone number.
        </p>
      </div>
      <form onSubmit={checkValidValues} noValidate>
        <FormInput
          name="name"
          type="text"
          label="Name"
          value={name}
          invalidInputMessage={errorMessages.errorName}
          onChange={handleChange}
          placeholder="e.g. Stephen King"
          required
        />

        <FormInput
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
          invalidInputMessage={errorMessages.errorEmail}
          label="Email Address"
          placeholder="e.g. stephenking@lorem.com"
          required
        />

        <FormInput
          name="phone"
          type="tel"
          value={phone}
          onChange={handleChange}
          invalidInputMessage={errorMessages.errorPhone}
          label="Phone Number"
          placeholder="e.g. 123 456 7890"
          required
        />
      </form>
    </div>
  );
};

export default SelectPlanForm;
