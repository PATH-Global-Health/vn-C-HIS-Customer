import React, { useCallback } from 'react';
import styled from 'styled-components';

import {
  IonRow,
  IonCol,
  IonIcon,
  IonItem,
  IonLabel,
} from '@ionic/react';
import { useDispatch } from '@app/hooks';
import { setDataForgotPassword } from '@app/slices/auth';

export interface MethodField {
  name: string;
  icon: string;
  color: string;
  label: string;
  content: string;
  [key: string]: unknown;
}

interface Props {
  methods: MethodField[];
}

const StyledItem = styled(IonItem)`
  margin: 15px 15px;
  border: 1px solid #b3aeae;
  border-radius: 10px;
  --min-height: 40px;
  
`;

const StyledLabel = styled(IonLabel)`
  font-size: 35px;
  font-weight: 50;
  margin-bottom: 15px;
`;

const StyledIcon = styled(IonIcon)`
  margin: 20px 40px 20px 0px;
  padding: 10px 12px;
  font-size: 35px;
  border-radius: 10px;
  color: white;
  align-item: center;
`;

const MethodCard: React.FC<Props> = ({ methods }) => {
  const dispatch = useDispatch();

  const handeChange = useCallback((method: string) => {
    dispatch(setDataForgotPassword({ method }));
  }, [dispatch]);

  return (
    <>
      {(methods || []).map(({ name, icon, color, label, content }, index) => (
        <IonRow key={index}>
          <IonCol size="12" size-sm="3">
            <StyledItem color="light" onClick={() => handeChange(name)}>
              <StyledIcon icon={icon} style={{ backgroundColor: color }} />
              <StyledLabel style={{ fontSize: '18px' }}>
                <b>{label}</b>
                <br />
                {content}
              </StyledLabel>
            </StyledItem>
          </IonCol>
        </IonRow>
      ))}
    </>
  )
};

export default MethodCard;