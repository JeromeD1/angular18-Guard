import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user.model';
import { MessageService } from './services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'challenge18Guard';

  constructor(private userService: UserService, private messageService: MessageService, private router: Router) {}

  users!: User[];
  selectedUser!: User;
  // message: string = this.messageService.getMessage();


  //détail sur l'utilisation d'un getter comme ci dessous -> voir en bas du code du fichier
  get message() : string {
    return this.messageService.getMessage();
  }

  ngOnInit(): void {
      this.userService.currentUsers.subscribe(users => this.users = users);
  }

  chooseUser(id: number) {
    console.log("id", id);
    
    const newUsers = this.users.map((user) => (
      user.id === id ? {...user, selected: true} : {...user, selected: false}
    ));

    this.userService.setCurrentUsers(newUsers);
    this.selectedUser = newUsers.find(user => user.selected === true) as User;

    //on revient à la page d'accueil quand on change d'utilisateur
    this.router.navigate(["home"]);
    //et on efface le message
    this.messageService.setMessage("");
  }

  setEmptyMessage() {
    this.messageService.setMessage("");
  }
}



// Un getter est une méthode spéciale dans une classe qui est utilisée pour accéder à la valeur d’une propriété particulière. 
//En d’autres termes, un getter permet de “récupérer” ou “obtenir” la valeur d’une propriété.

// Dans votre exemple, get message() : string est un getter. Lorsque vous essayez d’accéder à la propriété message de l’objet,
// cette méthode est automatiquement appelée et la valeur renvoyée par this.messageService.getMessage() est renvoyée.

// Voici comment cela fonctionne en détail :

// Vous déclarez un getter en utilisant le mot-clé get suivi du nom de la propriété que vous voulez accéder.
// Vous définissez une fonction qui sera appelée chaque fois que vous essayez d’accéder à cette propriété.
// Dans cette fonction, vous spécifiez ce qui doit être renvoyé lorsque la propriété est accédée.
// Dans votre exemple, chaque fois que vous accédez à la propriété message de l’objet, la méthode getMessage() de messageService 
//est appelée et sa valeur de retour est renvoyée.

// Il est important de noter que les getters sont utilisés pour l’encapsulation, un principe fondamental de la programmation 
//orientée objet12. L’encapsulation signifie que les détails internes d’un objet, comme la façon dont ses propriétés 
//sont stockées ou calculées, sont cachés à l’extérieur de l’objet12. Cela permet de changer la façon dont une propriété est 
//calculée sans changer la façon dont elle est utilisée.

// Enfin, il existe également des setters, qui sont des méthodes utilisées pour définir la valeur d’une propriété. 
//Les setters fonctionnent de manière similaire aux getters, mais au lieu de récupérer la valeur d’une propriété, 
//ils la définissent.