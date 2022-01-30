import {Component, NgModule, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { AlertDialogComponent, DialogData } from './alert-dialog.component';

describe('AlertDiarogComponent', () => {
  let component: AlertDialogComponent;
  let fixture: ComponentFixture<AlertDialogComponent>;
  let debugElement: DebugElement;

  beforeEach( async( () => {
    const spy = jasmine.createSpyObj('MatDialogRef', ['close']);
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        NoopAnimationsModule,
      ],
      declarations: [ AlertDialogComponent ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: spy
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        },
      ],
    }).compileComponents();
  }));

  beforeEach( () => {
    fixture = TestBed.createComponent(AlertDialogComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows dialog title', () => {
    component.data.title = 'aaa';
    fixture.detectChanges();
    const title = debugElement.query(By.css('h1.dialog-title')).nativeElement.textContent;
    expect(title).toEqual('aaa');
  });

  it('shows dialog contents', () => {
    component.data.contents = 'bbb';
    fixture.detectChanges();
    const contents = debugElement.query(By.css('p.dialog-contents')).nativeElement.textContent;
    expect(contents).toEqual('bbb');
  });

  it('on click chancel', () => {
    fixture.detectChanges();
    const cancel: HTMLElement = debugElement.query(By.css('button.cancel-button')).nativeElement;
    cancel.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });
});
