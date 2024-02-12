import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { UserSignupComponent } from './pages/user-signup/user-signup.component';
import { PractitionerSignupComponent } from './pages/practitioner-signup/practitioner-signup.component';
import { FeedComponent } from './pages/feed/feed.component';

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
    }
];
