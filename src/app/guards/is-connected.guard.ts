import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { User } from '../models/user.model';
import { MessageService } from '../services/message.service';

export const isConnectedGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot
  )  : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {

    const userService = inject(UserService);
    const router = inject(Router);
    const messageService = inject(MessageService)

    return userService.currentUsers.pipe( // je définie ma valeur true ou false en fonction des données de l'utilisateur sélectionné
      map(users => {  //map me permet ici de transformer mes données utilisateur en un boolean (true ou false)
        const selectedUser: User = users.find(user => user.selected === true) as User;

        if(selectedUser && selectedUser.isConnected) {
          if(selectedUser.role === "anonymous"){
            messageService.setMessage("HOW CAN YOU BE CONNECTED, NOBODY KNOWS YOU !!! => Redirection vers HOME");
            return false;
          } else {
            messageService.setMessage("");
            return true;
          }
        } else {

          //on redirige vers la page home
          console.log("Vous n'êtes pas connecté : accès interdit");
          messageService.setMessage("Vous n'êtes pas connecté : accès interdit => Redirection vers HOME");
          
          router.navigate(['home'])
          return false; //on interdit l'accès à la page demandée
        }

      })
    )

};
