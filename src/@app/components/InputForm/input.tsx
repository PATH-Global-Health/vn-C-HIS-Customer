import React, { FC } from "react";
import { IonItem, IonLabel, IonInput } from "@ionic/react";
import { Controller } from "react-hook-form";

export interface InputProps {
  name: string;
  control?: any;
  label?: string;
  component?: JSX.Element;
}

const Input: FC<InputProps> = ({
  label,
  name,
  control,
  component: Component,
}) => {


  return (
    <>
      <IonItem>
        {label && (
          <IonLabel position="floating">{label}</IonLabel>
        )}
        <Controller
          name={name}
          control={control}
          render={(): JSX.Element => (
            <IonInput />
          )}
        />
      </IonItem>
    </>
  );
};

export default Input;