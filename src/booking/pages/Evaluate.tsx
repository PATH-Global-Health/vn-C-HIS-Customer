import React, { useEffect, useState } from 'react';
import {
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonLabel,
    IonPage,
    IonAlert,
    IonModal
} from '@ionic/react';
import { useDispatch } from '@app/hooks';
import { useHistory } from "react-router-dom";
import { arrowBack, checkmark, chevronBack } from 'ionicons/icons';
import { getServiceId } from 'booking/slices/workingCalendar';
import { useTranslation } from 'react-i18next';
import { getUserInfo } from '../slices/workingCalendar';
import styles from '../css/evaluate.module.css';
import { Rating } from 'react-simple-star-rating';
import classNames from 'classnames/bind';
import styled from 'styled-components';
const StyleModal = styled(IonModal)`
    {
      padding: 65% 15%;
    }
`

const Evaluate: React.FC = () => {
    var cx = classNames.bind(styles);
    const [showAlert, setShowAlert] = useState(false);
    const [selectedBtn, setSelectedBtn] = useState("");
    const { t } = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();
    const [rating, setRating] = useState(0);
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
                <Rating onClick={() => console.log("lieu")} ratingValue={rating} />
                <IonLabel className={styles.styledLabelFb}>{t('What do you feel is not good ?')}</IonLabel>
                <div className={styles.styledDivSelected}>
                    <button
                        onClick={() => setSelectedBtn('nv')}
                        className={cx('btnSelected', {
                            'btnSelectedS': selectedBtn === "nv"
                        })}>{t('Staff')}</button>
                    <button
                        onClick={() => setSelectedBtn('cldv')}
                        className={cx('btnSelected', {
                            'btnSelectedS': selectedBtn === "cldv"
                        })}>{t('Service quality')}</button>
                    <button
                        onClick={() => setSelectedBtn('ttb')}
                        className={cx('btnSelected', {
                            'btnSelectedS': selectedBtn === "ttb"
                        })}>{t('Equipment')}</button>
                    <button
                        onClick={() => setSelectedBtn('tgxn')}
                        className={cx('btnSelected', {
                            'btnSelectedS': selectedBtn === "tgxn"
                        })}>{t('Test time')}</button>
                </div>
                <IonLabel className={styles.styledLabelShare}>{t('Share more')}</IonLabel>
                <IonInput className={styles.styledInput} placeholder={t('Your opinion')}></IonInput>

                <button
                    className={styles.btnCustom}
                    onClick={() => {
                        setShowModal(true);
                    }
                    }>{t('Submit a review')}
                    {/* <IonIcon className={styles.iconRight} icon={arrowForward}></IonIcon>
                    <IonIcon className={styles.iconLeft} icon={flash}></IonIcon> */}
                </button>
            </IonContent>
        </IonPage >
    );
};

export default Evaluate;