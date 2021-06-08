/* eslint-disable import/no-anonymous-default-export */

import auth from '@app/slices/auth';
import global from '@app/slices/global';
import post from 'news/post/post.slice';
import { unitType } from '../../booking/slices';
import { hospital } from '../../booking/slices';
import { dateBooking } from '../../booking/slices';
import { workingCaledar } from '../../booking/slices';

export default {
  workingCaledar,
  dateBooking,
  hospital,
  unitType,
  auth,
  global,
  post,
};
