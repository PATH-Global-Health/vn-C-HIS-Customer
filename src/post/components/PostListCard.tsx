import React, { useEffect } from 'react';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
} from '@ionic/react';
import { useDispatch, useSelector } from '@app/hooks';
import { getPosts } from 'post/post.slice';

const PostListCard: React.FC = () => {
  const dispatch = useDispatch();
  const postList = useSelector((s) => s.post.postList);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <IonContent>
      {postList.slice(0, 5).map((p) => (
        <IonCard key={p.id}>
          <IonCardHeader>
            <IonCardSubtitle>PostId: {p.title}</IonCardSubtitle>
            <IonCardTitle>AuthorId: {p.userId}</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>{p.body}</IonCardContent>
        </IonCard>
      ))}
    </IonContent>
  );
};

export default PostListCard;
