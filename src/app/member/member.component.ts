import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Member } from '../model/member.model';
import { MemberService } from '../services/member.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  member! : Member;
  members! : Observable<Array<Member>>;
  errorMessage!: string;
  searchFormGroup! : FormGroup ;

  constructor(private memberService : MemberService, private fb : FormBuilder, private router : Router) { }

  ngOnInit(): void {   
    this.initMember();
    this.searchFormGroup=this.fb.group({
      keyword : this.fb.control("")
    });
    this.handleSearchMembers();
  }

  private initMember() {
    this.member={name:""};
  }

  handleSearchMembers() {
    let kw=this.searchFormGroup?.value.keyword;
    this.members=this.memberService.searchMembers(kw).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }


  onSaveMember(data: Member) {

    this.memberService.saveMember(data)
      .subscribe(res=>{
        this.member=res;
      },err=>{
         console.log(err);
      })
      this.handleSearchMembers();  
  }


}
