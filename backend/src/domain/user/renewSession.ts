import tokenService from "../../services/token";

const renewSession = async (token: string): Promise<string> => {
    return tokenService.renewToken(token);
}

export default renewSession;