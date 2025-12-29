export interface LoginResponse {
    token: string;
    user: { email: string; name: string; }
}

export interface LoginForm {
  email: string
  password: string
}
