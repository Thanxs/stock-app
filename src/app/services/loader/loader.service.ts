import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private count = 0;
  public readonly loading = signal(false);
  public readonly initialLoading = signal(false);
  public readonly visible = computed(() => this.loading() || this.initialLoading());

  public show(): void {
    this.count++;
    this.loading.set(true);
  }

  public hide(): void {
    this.count = Math.max(0, this.count - 1);
    this.loading.set(this.count > 0);
  }

  public showInitial(): void {
    this.initialLoading.set(true);
  }

  public hideInitial(): void {
    this.initialLoading.set(false);
  }
}
