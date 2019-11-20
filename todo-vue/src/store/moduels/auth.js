// state : data와 유사
const state = {
    token: null
}
// mutations : state를 변화시키기 위한 메서드(함수)
const mutations = { // 동기적 처리만
    // 첫번째 인자는 무적권 state
    // 이후 인자는 payload(즉, 그냥 매개변수)
    setToken(state, token) {
        state.token = token
    }
}

const actions = {   // 비동기 처리까지 가능
    // 첫번째 인자는 context (다양한)
    // 이후 인자는 payload(임의의 매개변수 값)
    login(context, token) {
        // mutation 호출 -> commit
        context.commit('setToken', token)
    },
    logout(context) {
        context.commit('setToken', null)
    }
}

import jwtDecode from 'jwt-decode'
const getters = {   // TodoList.vue에서 가져옴
    options(state) {
        return {
            headers: {
                Authorization: `JWT ${state.token}`
            }
        }
    },
    user(state) {
        return jwtDecode(state.token).user_id
        
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}