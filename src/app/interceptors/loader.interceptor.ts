import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize, Observable } from 'rxjs';

import { LoaderService } from '../services/loader/loader.service';

export function loaderInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const loader = inject(LoaderService);

  loader.show();

  return next(req).pipe(finalize(() => loader.hide()));
}
