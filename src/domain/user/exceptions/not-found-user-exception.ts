import { NotFoundException } from '../../../common/exceptions/not-found-exception';

export class NotFoundUserException extends NotFoundException {
  constructor() {
    super('This email is not registered.');
  }
}