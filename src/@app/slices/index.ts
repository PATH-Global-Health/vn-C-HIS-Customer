/* eslint-disable import/no-anonymous-default-export */
import post from 'post/post.slice';
import auth from './auth';
import { unitType } from '../../booking/slices';
import { hospital } from '../../booking/slices';
import {dateBooking} from '../../booking/slices';
import {workingCaledar} from '../../booking/slices';

export default {
  workingCaledar,
  dateBooking,
  hospital,
  unitType,
  auth,
  post,
};
