export class user {
  constructor(public email: string,
              public id: string,
              private _token: string,
              private _tokenexpirationDate: Date) {
  }

  // we will always create a new user object when a user logs in..
  get token() {
    if (!this._tokenexpirationDate || new Date() > this._tokenexpirationDate) {
      return null;
    }
    return this._token;
  }
}
