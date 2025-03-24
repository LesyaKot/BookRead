export const selectPlanning = (state) => state.planning?.planning ?? null;
export const selectPlanningEnded = (state) => state.planning?.planningEnded ?? false;
export const selectIsLoading = (state) => state.planning?.isLoading ?? false;