'use client';
import { useState } from 'react';
import CompanyInfoForm from '../../components/FormComponents/Forms/CompanyInfoForm';
import { multiModalType, multiStepFormDataType } from '@/types/FormTypes';
import MultiStepForm from '@/components/FormComponents/MultiStepForm';
import SelectPlanForm from '@/components/FormComponents/Forms/SelectPlanForm';
import AddsOnForm from '@/components/FormComponents/Forms/AddsOnForm';
import FinishingUp from '@/components/FormComponents/Forms/FinishingUp';

const initialState: multiStepFormDataType = {
  userInfo: {
    name: '',
    email: '',
    phone: {
      number: '',
      countryData: {
        name: '',
        phoneCode: '',
        shortName: '',
      },
    },
  },
  selectedPlan: {
    plan: {
      name: '',
      price: 0,
    },
    planDuration: '',
  },
  addsOn: [],
};

export const yearWithDiscond: number = 10; // 12 months - 2 months free

const MultiStepPage = () => {
  const [canContinue, setCanContinue] = useState(false);
  const [controls, setControls] = useState(false);
  const [orderedForm, setGoToForm] = useState<number | undefined>();
  const [data, setData] = useState(initialState);

  const Forms: multiModalType = [
    {
      formLabel: 'COMPANY INFORMATION',
      form: (
        <CompanyInfoForm
          key="CompanyInfoForm"
          setContinue={setCanContinue}
          saveData={setData}
          data={data.userInfo}
        />
      ),
    },
    {
      formLabel: 'CONTACT DETAILS',
      form: (
        <SelectPlanForm
          key="SelectPlanForm"
          setContinue={setCanContinue}
          saveData={setData}
          data={data.userInfo}
        />
      ),
    },

    {
      formLabel: 'ADD EMPLOYEES',
      form: (
        <FinishingUp
          key="SummaryForm"
          data={data}
          setGoToForm={setGoToForm}
          controlState={[controls, setControls]}
        />
      ),
    },
  ];

  return (
    <div
      id="page-container"
      className="h-full bg-magnolia flex justify-center items-center"
    >
      <MultiStepForm
        Forms={Forms}
        continueState={[canContinue, setCanContinue]}
        goToForm={orderedForm}
        setGoToForm={setGoToForm}
        disableControls={controls}
      />
    </div>
  );
};

export default MultiStepPage;
