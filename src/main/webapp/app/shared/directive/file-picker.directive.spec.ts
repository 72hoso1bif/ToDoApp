import { FilePickerDirective } from './file-picker.directive';
import {AuthService} from "../../services/AuthService";
import {TestBed} from "@angular/core/testing";

describe('FilePickerDirective', () => {

  it('should create an instance', () => {
    const directive = new FilePickerDirective(null);
    expect(directive).toBeTruthy();
  });
});
