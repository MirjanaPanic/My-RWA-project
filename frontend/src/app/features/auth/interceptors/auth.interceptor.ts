import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

//PRESRETAC
//httpRequest -> interceptor -> backend API
//da dodam token u header svih http requesta
//DRY princip ! DON'T REPEAT YOURSELF :)
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(clonedRequest); //salje izmenjeni zahtev sa tokenom
  }

  return next(req); //zahtev bez tokena, originalni zahtev bez tokena (npr. login/register rute)
};
