import { SafeHtmlPipe } from './safe-html.pipe';
import { DomSanitizer } from '@angular/platform-browser';

describe('SafeHtmlPipe', () => {
  it('create an instance', () => {
    const pipe = new SafeHtmlPipe(
      { bypassSecurityTrustHtml: (input: string) =>  null } as DomSanitizer);
    expect(pipe).toBeTruthy();
  });
});
