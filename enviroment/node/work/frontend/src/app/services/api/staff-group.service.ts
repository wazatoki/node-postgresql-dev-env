import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { StaffGroup } from '../models/group/staff-group';

@Injectable({
  providedIn: 'root'
})
export class StaffGroupService {

  add(data: StaffGroup): Observable<StaffGroup | HttpErrorResponse> {
    return this.http.post<StaffGroup>( '/staffGroup', data );
  }

  update(data: StaffGroup): Observable<StaffGroup | HttpErrorResponse> {
    return this.http.put<StaffGroup>( '/staffGroup', data );
  }

  delete(data: string[]): Observable<StaffGroup[] | HttpErrorResponse> {
    return this.http.delete<StaffGroup>('/staffGroup', data);
  }

  constructor( private http: HttpService ) { }
}
