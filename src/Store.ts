import create from "zustand"

type authType = {
    user: null | User,
    setUser: (user: User) => void,
    login: (token: string, to?: string) => void,
    logout: () => void
}

type User = {
    name: string,
    email: string
}


export const useAuthStore = create<authType>((set) => ({
    user: null,
    setUser(user: User) {
        set({user})
    },
    login(token: string, to = '/') {
        set({user: {
            name: 'Wargas Teixeira',
            email: 'teixeira.wargas@gmail.com'
        }})
    },
    logout() {
        set({user: null})
    },
}))