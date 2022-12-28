export const sellerReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_SELLER':
            return action.payload;
        case 'UNSET_SELLER':
            return action.payload;
        default:
            return state;
    }
}