import { handler } from './reminders';

describe('reminders handler', () => {
  xit('sends sms reminders', () => {
    const result = handler();
    expect(result).toEqual('wub');
  });
});
