// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { v4 as uuidv4 } from 'uuid';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
import { EncryptionService } from '../services/encryption.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private route :Router,private encryption:EncryptionService){}

  onLogin() {
    if (this.username === 'admin' && this.password === 'Admin#777') {
      const timestamp = new Date().getTime();
      const dataToEncrypt = `admin:Admin#777:${timestamp}`;
      const encryptedData = this.encryption.encryptData(dataToEncrypt);
      console.log(encryptedData)
      this.encryption.decryptData(encryptedData)
      localStorage.setItem('auth', encryptedData);
      this.route.navigate(['/Home'])
    } else {
      this.username ='';
      this.password='';
      alert('Invalid credentials');
    }
  }
}
