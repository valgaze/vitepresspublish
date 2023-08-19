import { ENVEL } from "./types";
export class Speedybot {
  constructor(private token?: string) {}
  setToken(t: string) {
    this.token = t;
  }
  getToken(t: string) {
    return this.token;
  }

  getEnv(e: ENVEL): ENVEL {
    return e;
  }
}
