import {
  ActionReducerMap, createFeatureSelector, MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { routerReducer, RouterReducerState, getSelectors } from '@ngrx/router-store';


// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface State {

}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];


export const selectRouter = createFeatureSelector<RouterReducerState>('router');

export const {
  selectRouteParams
} = getSelectors(selectRouter);
