import React, { useEffect, useState } from 'react';
import {
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonLabel,
    IonPage,
    IonAlert
} from '@ionic/react';
import { useDispatch } from '@app/hooks';
import { useHistory } from "react-router-dom";
import { arrowBack, chevronBack } from 'ionicons/icons';
import { getServiceId } from 'booking/slices/workingCalendar';
import { useTranslation } from 'react-i18next';
import { getUserInfo } from '../slices/workingCalendar';
import styles from '../css/evaluate.module.css';
import { Rating } from 'react-simple-star-rating';
import classNames from 'classnames/bind';


const Evaluate: React.FC = () => {
    var cx = classNames.bind(styles);
    const [showAlert, setShowAlert] = useState(false);
    const [selectedBtn, setSelectedBtn] = useState("");
    const { t } = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();
    const [rating, setRating] = useState(0)
    useEffect(() => {
        dispatch(getUserInfo());
    }, [])
    return (
        <IonPage className={styles.styledPage}>
            <IonAlert
                isOpen={showAlert}
                cssClass='my-custom-class'
                onDidDismiss={() => setShowAlert(false)}
                // header={`<strong>Lieu</strong>`}
                // subHeader={'Subtitle'}
                message={`<strong class=${styles.styledMessage}>${t('Thank you for submitting your review')}</strong>`}
                buttons={[
                    {
                        text: `${t('Back to home page')}`,
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                            // console.log('Confirm Cancel');
                            history.push('/home');
                        }
                    },
                    {
                        text: `${t('Cancel')}`,
                        handler: () => {
                            console.log('Confirm Ok');
                        }
                    }
                ]}
            />
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
                        setShowAlert(true);
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