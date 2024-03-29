import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { UserSignupComponent } from './pages/user-signup/user-signup.component';
import { PractitionerSignupComponent } from './pages/practitioner-signup/practitioner-signup.component';
import { FeedComponent } from './pages/feed/feed.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { PostContentComponent } from './pages/post-content/post-content.component';
import { PractitionerComponent } from './pages/profiles/practitioner/practitioner.component';
import { UserComponent } from './pages/profiles/user/user.component';
import { AuthGuard, canActivateTeam } from './service/auth-guard.service';
import { NotificationComponent } from './pages/notification/notification.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
    },
    {
        path: "signin",
        component: SigninComponent,
    },
    {
        path: "new-account",
        component: CreateAccountComponent,
    },
    {
        path: "login",
        component: LoginPageComponent,
    },
    {
        path: "signup/user",
        component: UserSignupComponent,
    },
    {
        path: "signup/practitioner",
        component: PractitionerSignupComponent,
    },
    {
        path: "feed",
        component: FeedComponent,
        canActivate: [canActivateTeam]
    },
    {
      path: "feed/notification",
      component: NotificationComponent,
  },

    {
        path: "post/:id",
        component: PostPageComponent,
    }, 
    {
        path: "create-post",
        component: PostContentComponent,
    },
    {
        path: "profile/practitioner",
        component: PractitionerComponent,
    },
    {
        path: "profile/user/:email",
        component: UserComponent,
    }
];
