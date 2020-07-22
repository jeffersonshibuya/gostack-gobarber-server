import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/modules/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

// import IMailProvider from './MailProvider/models/IMailProvider';
// import MailProvider from

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
