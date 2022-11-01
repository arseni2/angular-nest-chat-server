export type JwtPayloadType = {
    id: number
    name: string
}

export type JwtDecodeTokenType = {
    email: string
    sub: number
    exp: number
    iat: number
}