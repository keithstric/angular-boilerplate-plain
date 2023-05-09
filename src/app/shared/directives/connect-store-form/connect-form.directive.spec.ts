import { ConnectStoreFormDirective } from '@shared/directives/connect-store-form/connect-store-form.directive';

describe('ConnectFormDirective', () => {
  it('should create an instance', () => {
    // @ts-ignore
		const directive = new ConnectStoreFormDirective();
    expect(directive).toBeTruthy();
  });
});
