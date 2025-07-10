import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public user$ = this.userSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();

  constructor() {
    this.loadUserFromStorage();
  }

  get currentUser(): User | null {
    return this.userSubject.value;
  }

  get isAuthenticated(): boolean {
    return !!this.userSubject.value;
  }

  private loadUserFromStorage(): void {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.userSubject.next(JSON.parse(savedUser));
    }
  }

  async login(email: string, password: string): Promise<boolean> {
    this.loadingSubject.next(true);
    
    // Simular chamada de API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Validação simples para demo
    if (email === 'joao@email.com' && password === '123456') {
      const userData: User = {
        id: '1',
        name: 'João Silva',
        email: 'joao@email.com'
      };
      
      this.userSubject.next(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      this.loadingSubject.next(false);
      return true;
    }
    
    this.loadingSubject.next(false);
    return false;
  }

  async register(name: string, email: string, password: string): Promise<boolean> {
    this.loadingSubject.next(true);
    
    // Simular chamada de API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userData: User = {
      id: Date.now().toString(),
      name,
      email
    };
    
    this.userSubject.next(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    this.loadingSubject.next(false);
    return true;
  }

  logout(): void {
    this.userSubject.next(null);
    localStorage.removeItem('user');
  }
}