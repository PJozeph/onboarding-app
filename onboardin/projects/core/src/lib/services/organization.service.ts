import { Injectable } from '@angular/core';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private fireStore : Firestore) { }


  public async createOrganization(name : string ) {
    const result  = setDoc(doc(this.fireStore, name, "organization"), {
        users : []
    });
    console.log(result)
  }
}
