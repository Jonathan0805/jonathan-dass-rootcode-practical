const initialState = {
    items: []
}

export default(state = initialState, action) => {
    return {
        ...state,
        items: [
            ...state.items,
            action.payload
        ]
    }

}
