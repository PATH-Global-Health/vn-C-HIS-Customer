import React, { useEffect, useState } from 'react';
import {
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonLabel,
    IonPage,
} from '@ionic/react';
import { useDispatch } from '@app/hooks';
import { useHistory } from "react-router-dom";
import { arrowBack, arrowForward, chatbubble, flash } from 'ionicons/icons';
import { getServiceId } from 'booking/slices/workingCalendar';
import { useTranslation } from 'react-i18next';
import { getUserInfo } from '../slices/workingCalendar';
import styles from '../css/evaluate.module.css';
import { Rating } from 'react-simple-star-rating';

const Evaluate: React.FC = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();
    const [rating, setRating] = useState(0)
    useEffect(() => {
        dispatch(getUserInfo());
    }, [])
    return (
        <IonPage className={styles.styledPage}>
            <IonHeader className={styles.header}>
                <button
                    className={styles.btnCustomHeader}
                    onClick={() => history.goBack()}>
                    <IonIcon
                        className={styles.iconLeft}
                        icon={arrowBack}></IonIcon>
                </button>
                <IonLabel className={styles.headerLabel}>{t('Đánh giá dịch vụ')} </IonLabel>
            </IonHeader>
            <IonContent className={styles.content}>
                <IonLabel className={styles.styledLableThanks}>Cảm ơn đánh giá của bạn</IonLabel><br></br>
                <Rating onClick={() => console.log("lieu")} ratingValue={rating} />
                <IonLabel className={styles.styledLabelFb}>Bạn còn cảm thấy điều gì chưa tốt</IonLabel>
                <div className={styles.styledDivSelected}>
                    <button className={styles.btnSelected}>Nhân viên</button>
                    <button className={styles.btnSelected}>Chất lượng dịch vụ</button>
                    <button className={styles.btnSelected}>Trang thiết bị</button>
                    <button className={styles.btnSelected}>Thời gian xét nghiệm</button>
                </div>
                <IonLabel className={styles.styledLabelShare}>Chia sẻ thêm</IonLabel>
                <IonInput className={styles.styledInput} placeholder="Ý kiến của bạn"></IonInput>

                <button
                    className={styles.btnCustom}
                    onClick={() => {
                        dispatch(getServiceId('f2490f62-1d28-4edd-362a-08d8a7232229'));
                        history.push('/testingAppointment')
                    }
                    }>{t('Gửi đánh giá')}
                    {/* <IonIcon className={styles.iconRight} icon={arrowForward}></IonIcon>
                    <IonIcon className={styles.iconLeft} icon={flash}></IonIcon> */}
                </button>
            </IonContent>
        </IonPage >
    );
};

export default Evaluate;