import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  //#region VARIABLE

  //#endregion VARIABLE

  constructor(
    private http: HttpClient
  ) {
  }

  join(username: any) {
    return this.http.post<any>('http://localhost:8080/api/join', username, {
      headers: {
        'Accept': 'application/json'
      }
    });
  }

  getMessages(){
    return this.http.get<any>('http://localhost:8080/api/getMessages');
  }

  sendMessage(body: any){
    return this.http.post<any>('http://localhost:8080/api/sendMessage', body);
  }

  disconnect(username: string){
    console.log('disconnect')
    return this.http.post<any>('http://localhost:8080/api/disconnect', username);
  }

}
