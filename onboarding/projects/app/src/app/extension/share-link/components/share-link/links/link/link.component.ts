import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Link } from 'projects/app/src/app/extension/modal/link.extension.modal';
import { User } from 'projects/core/src/lib/modal/user/user.modal';
import { ShareLinkExtensionService } from '../../../../share-link.extension.service';
import { EditLinkComponent } from '../../edit/edit-link/edit-link.component';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {

  @Input() link : Link;
  @Input() user : User;

  constructor(private linkService : ShareLinkExtensionService,
              private matDialog : MatDialog ) { }

  ngOnInit(): void {
  }

  public onSelect(){
    window.open(this.link.url, "_blank");
  }

  public onDelete(userId: string, linkId: string) {
    this.linkService.removeLink(userId, linkId);
  }

  public onEdit(linkId : string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '20rem';
    dialogConfig.width = '40rem';
    dialogConfig.data =  { 'selectedLinkId' : linkId}
    this.matDialog.open(EditLinkComponent, dialogConfig)
  }

}
