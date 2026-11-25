import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.html',
  styleUrl: './menu-lateral.scss',
})
export class MenuLateral {
  readonly menuAberto = input(true);
  readonly alternarMenu = output<void>();

  protected solicitarAlternancia(): void {
    this.alternarMenu.emit();
  }
}
