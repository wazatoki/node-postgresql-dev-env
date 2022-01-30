import { Component, Directive, ElementRef, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AutofocusDirective } from './autofocus.directive';

describe('AutofocusDirective', () => {

  it('should create an instance', () => {
    const fixture = TestBed.createComponent(TestComponent)
    const directive = new AutofocusDirective( new ElementRef(fixture.nativeElement) );
    expect(directive).toBeTruthy();
  });
});

@Component({
  template: `
  <div>test component</div>`
})
class TestComponent { }