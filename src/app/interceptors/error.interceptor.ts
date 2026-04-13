import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiError } from '../models/api-error';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const apiError = error.error as ApiError;

      if (error.status === 400) {
        alert(apiError?.mensagem || 'Erro de regra de negócio');
      } else if (error.status === 404) {
        alert(apiError?.mensagem || 'Recurso não encontrado');
      } else if (error.status === 0) {
        alert('Não foi possível conectar ao servidor');
      } else {
        alert('Erro inesperado');
      }

      return throwError(() => error);
    })
  );
};