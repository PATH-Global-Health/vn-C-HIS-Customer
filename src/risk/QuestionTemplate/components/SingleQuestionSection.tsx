import React, { useEffect, useState } from "react";
import styled from "styled-components";

import {
  IonCol,
  IonContent,
  IonItem,
  IonRow,
  IonRadioGroup,
  IonRadio,
} from "@ionic/react";
import { Question } from "risk/QuestionTemplate/question-template.model";

const WrapperQuestion = styled.div`
  ion-label {
    --color: black !important;
  }
  ion-item {
    color: black;
    --background: white;
    --border-style: none;
  }
`;

interface ExtendQuestion extends Question {
  index: number;
}

interface Props {
  data: ExtendQuestion;
  onChange: (id: string) => void;
}

const SingleQuestionForm: React.FC<Props> = (props) => {
  const { data, onChange } = props;
  const [anwserId, setAnwserId] = useState<string | undefined>(undefined);
  return (
    <>
      <WrapperQuestion>
        <IonRow>
          <IonCol size="12">
            <IonItem color="light" lines="inset" className="group-item">
              <IonRadioGroup>
                <IonItem>{`Câu ${data.index + 1}: ${data?.description ?? ""
                  } ?`}</IonItem>
                {data?.answers?.map(({ id, description }, idx) => (
                  <IonItem key={idx}>
                    <IonRadio
                      slot="start"
                      value={id}
                      onClick={() => onChange(id)}
                    />
                    <div style={{ fontSize: "15px" }}>{description}</div>
                  </IonItem>
                ))}
              </IonRadioGroup>
            </IonItem>
          </IonCol>
        </IonRow>
      </WrapperQuestion>
    </>
  );
};

export default SingleQuestionForm;
