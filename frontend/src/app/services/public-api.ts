import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PublicUser {
  id: number;
  name: string;
  email: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class PublicApiService {
  private http = inject(HttpClient);

  getUsers(): Observable<PublicUser[]> {
    return this.http.get<PublicUser[]>('https://jsonplaceholder.typicode.com/users');
  }
}
