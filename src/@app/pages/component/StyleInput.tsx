import React from 'react';
import PropTypes from 'prop-types';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonButton, IonButtons } from '@ionic/react';
const StyleInput: React.FC = (props) => {
    return (
        <div style={{
            backgroundColor: 'white',
            border: '1px solid #d6d6c2',
            borderRadius: "30px",
            marginTop: '35px',
            height: '48px',
            fontSize: '18px',
            textTransform: 'initial',
            boxShadow: '1px 8px 8px 0px rgba(0, 0, 0, 0.05)'
        }}>

        </div>
    );
}

export default StyleInput;