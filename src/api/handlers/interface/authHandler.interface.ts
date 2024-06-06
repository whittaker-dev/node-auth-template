export default interface IAuthHandler {
  generateAuthToken(sub: string): { accessToken: string; refreshToken: string };
}
