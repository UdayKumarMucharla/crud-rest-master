/* tslint:disable:no-unused-variable */
import {UsersService} from "./shared/users.service";
import { TestBed, async, inject} from '@angular/core/testing';
import { UsersComponent } from './users.component';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('Component: Users', () => {
  it('should create an instance', () => {
   
    let component = new UsersComponent();
    expect(component).toBeTruthy();
  });
});
