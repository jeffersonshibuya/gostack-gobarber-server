"use strict";

var _FakeUsersRepository = _interopRequireDefault(require("../../users/repositories/fakes/FakeUsersRepository"));

var _ListProvidersService = _interopRequireDefault(require("./ListProvidersService"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import AppError from '@shared/errors/AppError';
let fakeUsersRepository;
let listProvidersService;
let fakeCacheProvider;
describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    listProvidersService = new _ListProvidersService.default(fakeUsersRepository, fakeCacheProvider);
  });
  it('should be able to show all the providers except the logged one', async () => {
    const loggedUser = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456'
    });
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe 2',
      email: 'johndoe2@test.com',
      password: '123456'
    });
    const providers = await listProvidersService.execute({
      user_id: loggedUser.id
    });
    expect(providers).toEqual([user1]);
  });
});