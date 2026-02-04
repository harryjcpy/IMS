import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import studentReducer from './slices/studentSlice';
import teacherReducer from './slices/teacherSlice';
import courseReducer from './slices/courseSlice';
import enrollmentReducer from './slices/enrollmentSlice';
import resultReducer from './slices/resultSlice';
import attendanceReducer from './slices/attendanceSlice';
import accountantReducer from './slices/accountantSlice';
import examReducer from './slices/examSlice';
import feeReducer from './slices/feeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    student: studentReducer,
    teacher: teacherReducer,
    course: courseReducer,
    enrollment: enrollmentReducer,
    result: resultReducer,
    attendance: attendanceReducer,
    accountant: accountantReducer,
    exam: examReducer,
    fee: feeReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;
