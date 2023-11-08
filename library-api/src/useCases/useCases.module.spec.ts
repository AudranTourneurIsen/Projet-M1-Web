import { GenreUseCases, AuthorUseCases, BookUseCases, UserUseCases } from '.';

describe('UseCasesModule', () => {
  it('should import all the useCases', () => {
    expect(GenreUseCases).toBeDefined();
    expect(AuthorUseCases).toBeDefined();
    expect(BookUseCases).toBeDefined();
    expect(UserUseCases).toBeDefined();
  });
});
