import React, { useEffect, useState } from 'react';
import {
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonLabel,
    IonPage,
    IonModal
} from '@ionic/react';
import { useDispatch } from '@app/hooks';
import { useHistory } from "react-router-dom";
import { checkmark, chevronBack } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { getUserInfo } from '../slices/workingCalendar';
import styles from '../css/evaluate.module.css';
import { Rating } from 'react-simple-star-rating';
import classNames from 'classnames/bind';
import styled from 'styled-components';
import examinationService from '../services/examinations';
const StyleModal = styled(IonModal)`
    {
      padding: 65% 15%;
    }
`

const Evaluate: React.FC = () => {
    var cx = classNames.bind(styles);
    const [selectedBtn, setSelectedBtn] = useState("");
    const { t } = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();
    const [rating, setRating] = useState(0);
    const [opinion, setOpinion] = useState("");
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        dispatch(getUserInfo());
    }, [])
    return (
        <IonPage className={styles.styledPage}>
            <StyleModal isOpen={showModal} cssClass='my-custom-class' onDidDismiss={() => setShowModal(false)}>
                <div className={styles.styledDivIconModalS}>
                    <IonIcon className={styles.styledIconModal} icon={checkmark}></IonIcon>
                </div>
                <div className={styles.styledDivLabel}>
                    <p>{t('Thank you for submitting your review')}</p>
                </div>
                <div className={styles.styledDivModal}>
                    <p onClick={() => history.push('/home')} className={styles.styledLabelModal}>{t('Back to home page')}</p>
                    <p onClick={() => setShowModal(false)} className={styles.styledLabelModal}>{t('Cancel')}</p>
                </div>
            </StyleModal>
            <IonHeader className={styles.header}>
                <button
                    className={styles.btnCustomHeader}
                    onClick={() => history.goBack()}>
                    <IonIcon
                        className={styles.iconLeft}
                        icon={chevronBack}></IonIcon>
                </button>
                <IonLabel className={styles.headerLabel}>{t('Service Reviews')} </IonLabel>
            </IonHeader>
            <IonContent className={styles.content}>
                <IonLabel className={styles.styledLableThanks}>{t('Thanks for your review')}</IonLabel><br></br>
                <Rating onClick={(rate) => setRating(rate)} ratingValue={rating} />
                <IonLabel className={styles.styledLabelFb}>{t('What do you feel is not good ?')}</IonLabel>
                <div className={styles.styledDivSelected}>
                    <button
                        onClick={() => setSelectedBtn('Staff')}
                        className={cx('btnSelected', {
                            'btnSelectedS': selectedBtn === "Staff"
                        })}>{t('Staff')}</button>
                    <button
                        onClick={() => setSelectedBtn('Service quality')}
                        className={cx('btnSelected', {
                            'btnSelectedS': selectedBtn === "Service quality"
                        })}>{t('Service quality')}</button>
                    <button
                        onClick={() => setSelectedBtn('Equipment')}
                        className={cx('btnSelected', {
                            'btnSelectedS': selectedBtn === "Equipment"
                        })}>{t('Equipment')}</button>
                    <button
                        onClick={() => setSelectedBtn('Test time')}
                        className={cx('btnSelected', {
                            'btnSelectedS': selectedBtn === "Test time"
                        })}>{t('Test time')}</button>
                </div>
                <IonLabel className={styles.styledLabelShare}>{t('Share more')}</IonLabel>
                <IonInput onIonChange={(e) => setOpinion(e.detail.value!)} className={styles.styledInput} placeholder={t('Your opinion')}></IonInput>

                <button
                    className={styles.btnCustom}
                    onClick={async () => {
                        try {
                            await examinationService.evaluateExamination(history.location.state + "", rating + "", selectedBtn, opinion);
                            setShowModal(true);
                        } catch (error) {

                        }
                    }
                    }>{t('Submit a review')}
                </button>
            </IonContent>
        </IonPage >
    );
};

export default Evaluate;