import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/users/login/login.component';
import { RegisterComponent } from './pages/users/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { provideGuardForPermission } from './services/auth.guard';

export const routes: Routes = [
    {
        path: 'home',
        canActivate: [provideGuardForPermission()],
        component: HomeComponent,
    },
    {
        path: 'posts',
        canActivate: [provideGuardForPermission()],
        loadChildren: () => import('./pages/posts/posts.module').then(m => m.PostsModule)
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];
