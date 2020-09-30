const initialState = {
  token: null,
	datas: null
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'USER':
      return {
        ...state,
      }
    default:
      return { ...state }
  }
}

export default user
