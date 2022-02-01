export class CreateBookEvent {
  constructor(
    public readonly title: string,
    public readonly author: string,
    public readonly price: string,
    public readonly old_price: string,
    public readonly rating: number,
    public readonly image_url: string,
    public readonly user_email: string,
  ) {}
}
