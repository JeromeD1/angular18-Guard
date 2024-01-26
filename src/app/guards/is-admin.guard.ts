import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { UserService } from '../services/user.service';
import { MessageService } from '../services/message.service';
import { inject } from '@angular/core';
import { User } from '../models/user.model';

export const isAdminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot
  )  : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {

    const userService = inject(UserService);
    const router = inject(Router);
    const messageService = inject(MessageService);

    return userService.currentUsers.pipe( // je définie ma valeur true ou false en fonction des données de l'utilisateur sélectionné
      map(users => { //map me permet ici de transformer mes données utilisateur en un boolean (true ou false)
        const selectedUser: User = users.find(user => user.selected === true) as User;

        if(selectedUser && selectedUser.role === "admin") {
          messageService.setMessage("");
          return true;
        } else {
          //on redirige vers la page home
          console.log("Vous n'êtes pas admin : accès interdit");
          messageService.setMessage("Vous n'êtes pas admin : accès interdit => Redirection vers HOME")
          
          router.navigate(['home'])
          return false; //on interdit l'accès à la page demandée
        }

      })
    )

};
