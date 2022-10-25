import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Member} from "../model/member.model";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http:HttpClient) { }

  public getMembers():Observable<Array<Member>>{
    return this.http.get<Array<Member>>(environment.backendHost+"/members")
  }
  public searchMembers(keyword : string):Observable<Array<Member>>{
    return this.http.get<Array<Member>>(environment.backendHost+"/members/search?keyword="+keyword)
  }
  public saveMember(member: Member):Observable<Member>{
    return this.http.post<Member>(environment.backendHost+"/members",member);
  }
  public deleteMember(id: number){
    return this.http.delete(environment.backendHost+"/members/"+id);
  }
}
