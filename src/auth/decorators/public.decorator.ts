import { SetMetadata } from '@nestjs/common';

export const Public = () => SetMetadata('isPublic', true);
//ova ruta je javna, nije potreban token
