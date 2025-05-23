import {createSelector} from "@reduxjs/toolkit";

export const userSelector = createSelector(store => store.user.user, item => item)
export const findUserSelector = createSelector(store => store.findUsers, item => item)
export const notificationSelector = createSelector(store => store.notification, item => item)